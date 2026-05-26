import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FestivoComponent } from '../festivo.component';
import { FestivoComponentInstanceService } from '../festivo-component-instance.service';
import { FestivoService } from '../festivo.service';

@Component({
  selector: 'ibpm-acciones-festivo',
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './acciones-festivo.component.html',
  styleUrl: './acciones-festivo.component.scss',
})
/**
 * Calendario para consultar/guardar días festivos.
 */
export class AccionesFestivoComponent {
  public uc?: FestivoComponent;

  public meses: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  // Semana con inicio en Lunes.
  public diasSemana: string[] = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  public mesSeleccionado: number;
  public anioSeleccionado: number;
  public anios: number[] = [];

  public calendario: Array<Array<Date | null>> = [];

  // dateKey (YYYY-MM-DD) -> descripcion
  public pendingAdds = new Map<string, string>();
  public pendingRemoves = new Map<string, string>();

  // dateKey (YYYY-MM-DD) -> descripcion (servidor)
  private serverHolidays = new Map<string, string>();

  public descripcionNueva: string = '';
  public isLoading = false;

  constructor(
    private festivoService: FestivoService,
    private festivoComponentInstanceService: FestivoComponentInstanceService,
  ) {
    const now = new Date();
    this.mesSeleccionado = now.getMonth();
    this.anioSeleccionado = now.getFullYear();
    // Rango razonable para seleccionar.
    this.anios = Array.from({ length: 11 }, (_, i) => this.anioSeleccionado - 5 + i);
  }

  ngOnInit(): void {
    this.uc = this.festivoComponentInstanceService.getInstance();
    this.loadHolidaysForSelectedYear();
  }

  public onChangeMonth(): void {
    this.buildCalendar();
  }

  public onChangeYear(): void {
    // Cambiar de año invalida la consulta base, así que reiniciamos cambios pendientes.
    this.pendingAdds.clear();
    this.pendingRemoves.clear();

    const now = new Date();
    const currentYear = now.getFullYear();
    // Mantener un rango centrado en el año seleccionado (evita "opciones vacías").
    this.anios =
      this.anioSeleccionado === currentYear
        ? this.anios
        : Array.from({ length: 11 }, (_, i) => this.anioSeleccionado - 5 + i);

    this.loadHolidaysForSelectedYear();
  }

  public toggleDay(dia: Date): void {
    this.uc && (this.uc.mensaje = '');

    const key = this.dateToKey(dia);
    const isServerHoliday = this.serverHolidays.has(key);

    // Holiday "efectivo" = (agregado pendiente) o (servidor y no marcado para remover)
    const isInPendingAdd = this.pendingAdds.has(key);
    const isInPendingRemove = this.pendingRemoves.has(key);
    const effectiveHoliday =
      isInPendingAdd || (isServerHoliday && !isInPendingRemove);

    if (effectiveHoliday) {
      // Si está en pendingAdds, deshacemos el add. Si viene del servidor, lo pasamos a pendingRemoves.
      if (isInPendingAdd) {
        this.pendingAdds.delete(key);
      } else if (isServerHoliday) {
        // Backfill de descripcion desde el servidor.
        const desc = this.serverHolidays.get(key) ?? '';
        this.pendingRemoves.set(key, desc);
      }
    } else {
      // Está "no festivo" => agregamos o deshacemos un pending remove.
      if (isInPendingRemove) {
        this.pendingRemoves.delete(key);
      } else {
        const desc = this.descripcionNueva.trim();
        if (!desc) {
          if (this.uc) this.uc.mensaje = 'Ingrese una descripción para nuevos festivos.';
          return;
        }
        this.pendingAdds.set(key, desc);
      }
    }

    this.buildCalendar();
  }

  public isHolidayEffective(dia: Date): boolean {
    const key = this.dateToKey(dia);
    const isServerHoliday = this.serverHolidays.has(key);
    const isInPendingAdd = this.pendingAdds.has(key);
    const isInPendingRemove = this.pendingRemoves.has(key);
    return isInPendingAdd || (isServerHoliday && !isInPendingRemove);
  }

  public isPendingAdd(dia: Date): boolean {
    return this.pendingAdds.has(this.dateToKey(dia));
  }

  public isPendingRemove(dia: Date): boolean {
    return this.pendingRemoves.has(this.dateToKey(dia));
  }

  public consultar(): void {
    this.pendingAdds.clear();
    this.pendingRemoves.clear();
    this.loadHolidaysForSelectedYear();
    if (this.uc) this.uc.mensaje = 'Consulta actualizada.';
  }

  public guardar(): void {
    if (this.pendingAdds.size === 0 && this.pendingRemoves.size === 0) {
      if (this.uc) this.uc.mensaje = 'No hay cambios pendientes para guardar.';
      return;
    }

    this.isLoading = true;
    const addHolidaysDTO = [...this.pendingAdds.entries()].map(([key, descripcion]) => ({
      fecha: this.keyToIsoLocalMidday(key),
      descripcion,
    }));

    const removeHolidaysDTO = [...this.pendingRemoves.entries()].map(
      ([key, descripcion]) => ({
        fecha: this.keyToIsoLocalMidday(key),
        descripcion,
      }),
    );

    this.festivoService
      .saveHolidays({ addHolidaysDTO, removeHolidaysDTO })
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response?.respuesta) {
            this.pendingAdds.clear();
            this.pendingRemoves.clear();
            this.loadHolidaysForSelectedYear();
            if (this.uc) this.uc.mensaje = 'Cambios de festivos guardados correctamente.';
          } else {
            if (this.uc) this.uc.mensaje = response?.mensaje ?? 'No se pudo guardar los festivos.';
          }
        },
        error: (err) => {
          this.isLoading = false;
          if (this.uc)
            this.uc.mensaje =
              err?.error?.mensaje ?? err?.message ?? 'Error guardando los festivos.';
        },
      });
  }

  private loadHolidaysForSelectedYear(): void {
    this.isLoading = true;
    this.serverHolidays.clear();

    // Usamos fecha sin hora. El servicio la convierte a UTC midnight.
    const fechaBase = new Date(this.anioSeleccionado, 0, 1);
    this.festivoService.getHolidays(fechaBase).subscribe({
      next: (response) => {
        this.isLoading = false;
        const lista = response?.respuesta ?? [];
        this.serverHolidays.clear();

        for (const item of lista) {
          const key = this.isoToDateKey(item.fecha);
          this.serverHolidays.set(key, item.descripcion ?? '');
        }

        this.buildCalendar();
      },
      error: () => {
        this.isLoading = false;
        if (this.uc) this.uc.mensaje = 'Error consultando festivos.';
        this.buildCalendar();
      },
    });
  }

  private buildCalendar(): void {
    const year = this.anioSeleccionado;
    const month = this.mesSeleccionado; // 0-11

    const firstOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Offset para iniciar semana en Lunes.
    const firstDay = firstOfMonth.getDay(); // 0 Dom ... 6 Sáb
    const mondayBasedIndex = (firstDay + 6) % 7; // L->0 ... D->6

    const weeks: Array<Array<Date | null>> = [];
    for (let week = 0; week < 6; week++) {
      const row: Array<Date | null> = [];
      for (let day = 0; day < 7; day++) {
        const cellIndex = week * 7 + day;
        const dateNumber = cellIndex - mondayBasedIndex + 1;

        if (dateNumber < 1 || dateNumber > daysInMonth) {
          row.push(null);
        } else {
          row.push(new Date(year, month, dateNumber, 12, 0, 0, 0));
        }
      }
      weeks.push(row);
    }

    this.calendario = weeks;
  }

  private dateToKey(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  private isoToDateKey(iso: string): string {
    const d = new Date(iso);
    return this.dateToKey(d);
  }

  private keyToIsoLocalMidday(key: string): string {
    const [yS, mS, dS] = key.split('-');
    const y = Number(yS);
    const m = Number(mS) - 1;
    const d = Number(dS);
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    // Formato sin zona horaria para evitar 400 por parsing.
    return `${y}-${mm}-${dd}T00:00:00`;
  }
}
