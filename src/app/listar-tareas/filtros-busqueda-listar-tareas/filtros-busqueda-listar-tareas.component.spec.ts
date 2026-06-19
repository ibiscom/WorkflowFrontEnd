import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaListarTareaComponent } from './filtros-busqueda-listar-tareas.component';

describe('FiltrosBusquedaListarTareaComponent', () => {
  let component: FiltrosBusquedaListarTareaComponent;
  let fixture: ComponentFixture<FiltrosBusquedaListarTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaListarTareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaListarTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
