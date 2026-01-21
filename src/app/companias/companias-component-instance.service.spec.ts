import { TestBed } from '@angular/core/testing';

import { CompaniasComponentInstanceService } from './companias-component-instance.service';

describe('CompaniasComponentInstanceService', () => {
  let service: CompaniasComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompaniasComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
