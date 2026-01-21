import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaUsuariosComponent } from './filtros-busqueda-usuarios.component';

describe('FiltrosBusquedaUsuariosComponent', () => {
  let component: FiltrosBusquedaUsuariosComponent;
  let fixture: ComponentFixture<FiltrosBusquedaUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaUsuariosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
