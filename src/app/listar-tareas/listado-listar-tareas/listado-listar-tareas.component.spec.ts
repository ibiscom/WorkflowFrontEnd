import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoListarTareaComponent } from './listado-listar-tareas.component';

describe('ListadoListarTareaComponent', () => {
  let component: ListadoListarTareaComponent;
  let fixture: ComponentFixture<ListadoListarTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoListarTareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoListarTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
