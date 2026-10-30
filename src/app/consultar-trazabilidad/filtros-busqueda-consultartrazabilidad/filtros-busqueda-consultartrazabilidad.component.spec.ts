import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaConsultarTrazabilidadComponent } from './filtros-busqueda-consultartrazabilidad.component';

describe('FiltrosBusquedaConsultarTrazabilidadComponent', () => {
  let component: FiltrosBusquedaConsultarTrazabilidadComponent;
  let fixture: ComponentFixture<FiltrosBusquedaConsultarTrazabilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaConsultarTrazabilidadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaConsultarTrazabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

