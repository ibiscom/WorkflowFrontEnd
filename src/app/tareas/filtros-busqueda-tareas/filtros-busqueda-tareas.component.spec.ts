import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaTareasComponent } from './filtros-busqueda-tareas.component';

describe('FiltrosBusquedaTareasComponent', () => {
  let component: FiltrosBusquedaTareasComponent;
  let fixture: ComponentFixture<FiltrosBusquedaTareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaTareasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

