import { TestBed } from '@angular/core/testing';

import { ObjetowComponentInstanceService } from './objetow-component-instance.service';

describe('ObjetowComponentInstanceService', () => {
  let service: ObjetowComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjetowComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

