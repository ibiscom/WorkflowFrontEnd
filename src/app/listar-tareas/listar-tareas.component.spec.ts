import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTareaComponent } from './listar-tareas.component';

describe('ListarTareaComponent', () => {
  let component: ListarTareaComponent;
  let fixture: ComponentFixture<ListarTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarTareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListarTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
