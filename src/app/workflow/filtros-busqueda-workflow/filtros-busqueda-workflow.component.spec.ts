import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaWorkflowComponent } from './filtros-busqueda-workflow.component';

describe('FiltrosBusquedaWorkflowComponent', () => {
  let component: FiltrosBusquedaWorkflowComponent;
  let fixture: ComponentFixture<FiltrosBusquedaWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaWorkflowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
