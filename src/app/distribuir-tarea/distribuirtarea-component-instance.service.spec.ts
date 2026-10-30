import { TestBed } from '@angular/core/testing';

import { DistribuirtareaComponentInstanceService } from './distribuirtarea-component-instance.service';

describe('DistribuirtareaComponentInstanceService', () => {
  let service: DistribuirtareaComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistribuirtareaComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

