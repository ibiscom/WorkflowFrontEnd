import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaActividadRealizadaPorTareaComponent } from './filtros-busqueda-actividadrealizadaportarea.component';

describe('FiltrosBusquedaActividadRealizadaPorTareaComponent', () => {
  let component: FiltrosBusquedaActividadRealizadaPorTareaComponent;
  let fixture: ComponentFixture<FiltrosBusquedaActividadRealizadaPorTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaActividadRealizadaPorTareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaActividadRealizadaPorTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

