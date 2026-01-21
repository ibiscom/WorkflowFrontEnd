import { TestBed } from '@angular/core/testing';

import { WorkflowComponentInstanceService } from './workflow-component-instance.service';

describe('WorkflowComponentInstanceService', () => {
  let service: WorkflowComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkflowComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
