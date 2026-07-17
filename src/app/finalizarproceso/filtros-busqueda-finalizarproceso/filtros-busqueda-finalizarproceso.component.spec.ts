import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaFinalizarprocesoComponent } from './filtros-busqueda-finalizarproceso.component';

describe('FiltrosBusquedaFinalizarprocesoComponent', () => {
  let component: FiltrosBusquedaFinalizarprocesoComponent;
  let fixture: ComponentFixture<FiltrosBusquedaFinalizarprocesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaFinalizarprocesoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaFinalizarprocesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

