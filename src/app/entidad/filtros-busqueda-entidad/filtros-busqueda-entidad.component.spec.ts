import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaEntidadComponent } from './filtros-busqueda-entidad.component';

describe('FiltrosBusquedaEntidadComponent', () => {
  let component: FiltrosBusquedaEntidadComponent;
  let fixture: ComponentFixture<FiltrosBusquedaEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaEntidadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
