import { TestBed } from '@angular/core/testing';

import { PatronComponentInstanceService } from './patron-component-instance.service';

describe('PatronComponentInstanceService', () => {
  let service: PatronComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatronComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

