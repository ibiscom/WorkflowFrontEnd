import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuService } from './menu.service';

@Component({
  selector: 'fs-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  public opcionesPermitidas: string[] = [];

  isOpenConsulta = false;
  isOpenConstructor = false;
  isOpenCorrespondencia = false;
  isOpenEstructura = false;
  isOpenFlujo = false;
  isOpenGestion = false;
  isOpenInstrumentos = false;
  isOpenProcesos = false;
  isOpenRetencion = false;
  isOpenVisibilidad = false;

  constructor(
    private menuService: MenuService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.menuService.getPermissions().subscribe({
      next: (response) => {
        this.opcionesPermitidas = response.respuesta;
        console.log('Permisos cargados:', this.opcionesPermitidas);
      },
      error: () => {
        this.opcionesPermitidas = [];
      },
    });
  }

  toggleConsulta() {
    console.log('CLICK PERFILES');
    this.isOpenConsulta = !this.isOpenConsulta;
  }

  toggleConstructor() {
    console.log('CLICK OPCIONES');
    this.isOpenConstructor = !this.isOpenConstructor;
  }

  toggleCorrespondencia() {
    console.log('CLICK LOGS');
    this.isOpenCorrespondencia = !this.isOpenCorrespondencia;
  }

  toggleEstructura() {
    console.log('CLICK LOGS');
    this.isOpenEstructura = !this.isOpenEstructura;
  }

  toggleFlujo() {
    console.log('CLICK LOGS');
    this.isOpenFlujo = !this.isOpenFlujo;
  }

  toggleGestion() {
    console.log('CLICK LOGS');
    this.isOpenGestion = !this.isOpenGestion;
  }

  toggleInstrumentos() {
    console.log('CLICK LOGS');
    this.isOpenInstrumentos = !this.isOpenInstrumentos;
  }

  toggleProcesos() {
    console.log('CLICK LOGS');
    this.isOpenProcesos = !this.isOpenProcesos;
  }

  toggleRetencion() {
    console.log('CLICK LOGS');
    this.isOpenRetencion = !this.isOpenRetencion;
  }
  toggleVisibilidad() {
    console.log('CLICK LOGS');
    this.isOpenVisibilidad = !this.isOpenVisibilidad;
  }

  irA(ruta: string) {
    console.log('Navegando a:', ruta);
    this.router.navigate([ruta]);
  }
}
