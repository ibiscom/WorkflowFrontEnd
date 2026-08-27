import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaSimulacionComponent } from './filtros-busqueda-simulacion.component';

describe('FiltrosBusquedaSimulacionComponent', () => {
  let component: FiltrosBusquedaSimulacionComponent;
  let fixture: ComponentFixture<FiltrosBusquedaSimulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaSimulacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaSimulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

