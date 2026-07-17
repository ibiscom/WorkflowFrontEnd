import { TestBed } from '@angular/core/testing';

import { MigworkflowComponentInstanceService } from './migworkflow-component-instance.service';

describe('MigworkflowComponentInstanceService', () => {
  let service: MigworkflowComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MigworkflowComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
