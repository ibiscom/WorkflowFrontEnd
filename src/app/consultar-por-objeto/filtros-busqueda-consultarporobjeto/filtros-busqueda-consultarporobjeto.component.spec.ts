import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaConsultarPorObjetoComponent } from './filtros-busqueda-consultarporobjeto.component';

describe('FiltrosBusquedaConsultarPorObjetoComponent', () => {
  let component: FiltrosBusquedaConsultarPorObjetoComponent;
  let fixture: ComponentFixture<FiltrosBusquedaConsultarPorObjetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaConsultarPorObjetoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaConsultarPorObjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

