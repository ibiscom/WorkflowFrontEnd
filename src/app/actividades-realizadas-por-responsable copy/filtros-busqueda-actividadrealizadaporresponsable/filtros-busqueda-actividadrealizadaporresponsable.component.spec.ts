import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaActividadRealizadaPorResponsableComponent } from './filtros-busqueda-actividadrealizadaporresponsable.component';

describe('FiltrosBusquedaActividadRealizadaPorResponsableComponent', () => {
  let component: FiltrosBusquedaActividadRealizadaPorResponsableComponent;
  let fixture: ComponentFixture<FiltrosBusquedaActividadRealizadaPorResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaActividadRealizadaPorResponsableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaActividadRealizadaPorResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

