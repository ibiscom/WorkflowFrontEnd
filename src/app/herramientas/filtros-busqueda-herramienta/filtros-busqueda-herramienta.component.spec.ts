import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaHerramientaComponent } from './filtros-busqueda-herramienta.component';

describe('FiltrosBusquedaHerramientaComponent', () => {
  let component: FiltrosBusquedaHerramientaComponent;
  let fixture: ComponentFixture<FiltrosBusquedaHerramientaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaHerramientaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaHerramientaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

