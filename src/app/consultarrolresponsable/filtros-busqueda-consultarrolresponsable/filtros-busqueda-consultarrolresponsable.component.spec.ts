import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaConsultarRolResponsableComponent } from './filtros-busqueda-consultarrolresponsable.component';

describe('FiltrosBusquedaConsultarRolResponsableComponent', () => {
  let component: FiltrosBusquedaConsultarRolResponsableComponent;
  let fixture: ComponentFixture<FiltrosBusquedaConsultarRolResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaConsultarRolResponsableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaConsultarRolResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
