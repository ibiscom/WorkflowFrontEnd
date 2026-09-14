import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaConsultarPorTareaComponent } from './filtros-busqueda-consultarportarea.component';

describe('FiltrosBusquedaConsultarPorTareaComponent', () => {
  let component: FiltrosBusquedaConsultarPorTareaComponent;
  let fixture: ComponentFixture<FiltrosBusquedaConsultarPorTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaConsultarPorTareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaConsultarPorTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

