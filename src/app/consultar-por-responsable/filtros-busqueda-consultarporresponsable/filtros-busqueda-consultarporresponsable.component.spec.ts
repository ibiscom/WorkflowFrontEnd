import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaConsultarPorResponsableComponent } from './filtros-busqueda-consultarporresponsable.component';

describe('FiltrosBusquedaConsultarPorResponsableComponent', () => {
  let component: FiltrosBusquedaConsultarPorResponsableComponent;
  let fixture: ComponentFixture<FiltrosBusquedaConsultarPorResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaConsultarPorResponsableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaConsultarPorResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

