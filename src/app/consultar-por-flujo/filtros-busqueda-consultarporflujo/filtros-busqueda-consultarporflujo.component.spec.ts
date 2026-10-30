import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaConsultarPorFlujoComponent } from './filtros-busqueda-consultarporflujo.component';

describe('FiltrosBusquedaConsultarPorFlujoComponent', () => {
  let component: FiltrosBusquedaConsultarPorFlujoComponent;
  let fixture: ComponentFixture<FiltrosBusquedaConsultarPorFlujoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaConsultarPorFlujoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaConsultarPorFlujoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

