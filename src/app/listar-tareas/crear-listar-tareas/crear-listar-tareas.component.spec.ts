import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearWorkflowComponent } from './crear-listar-tareas.component';

describe('CrearWorkflowComponent', () => {
  let component: CrearWorkflowComponent;
  let fixture: ComponentFixture<CrearWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearWorkflowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
