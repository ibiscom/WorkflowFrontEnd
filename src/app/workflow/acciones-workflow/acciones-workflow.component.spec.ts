import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesWorkflowComponent } from './acciones-workflow.component';

describe('AccionesWorkflowComponent', () => {
  let component: AccionesWorkflowComponent;
  let fixture: ComponentFixture<AccionesWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesWorkflowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccionesWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
