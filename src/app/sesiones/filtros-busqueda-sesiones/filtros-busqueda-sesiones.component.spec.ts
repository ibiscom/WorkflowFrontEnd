import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaSesionesComponent } from './filtros-busqueda-sesiones.component';

describe('FiltrosBusquedaSesionesComponent', () => {
  let component: FiltrosBusquedaSesionesComponent;
  let fixture: ComponentFixture<FiltrosBusquedaSesionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaSesionesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaSesionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
