import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoWorkflowComponent } from './listado-workflow.component';

describe('ListadoWorkflowComponent', () => {
  let component: ListadoWorkflowComponent;
  let fixture: ComponentFixture<ListadoWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoWorkflowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
