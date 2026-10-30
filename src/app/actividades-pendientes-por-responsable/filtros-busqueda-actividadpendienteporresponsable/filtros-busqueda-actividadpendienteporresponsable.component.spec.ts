import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaActividadPendientePorResponsableComponent } from './filtros-busqueda-actividadpendienteporresponsable.component';

describe('FiltrosBusquedaActividadPendientePorResponsableComponent', () => {
  let component: FiltrosBusquedaActividadPendientePorResponsableComponent;
  let fixture: ComponentFixture<FiltrosBusquedaActividadPendientePorResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaActividadPendientePorResponsableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaActividadPendientePorResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

