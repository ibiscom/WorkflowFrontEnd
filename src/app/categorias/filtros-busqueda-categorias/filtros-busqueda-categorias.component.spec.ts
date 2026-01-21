import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaCategoriasComponent } from './filtros-busqueda-categorias.component';

describe('FiltrosBusquedaCategoriasComponent', () => {
  let component: FiltrosBusquedaCategoriasComponent;
  let fixture: ComponentFixture<FiltrosBusquedaCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaCategoriasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
