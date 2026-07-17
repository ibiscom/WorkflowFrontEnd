import { TestBed } from '@angular/core/testing';

import { MigworkflowService } from './migworkflow.service';

describe('MigworkflowService', () => {
  let service: MigworkflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MigworkflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
