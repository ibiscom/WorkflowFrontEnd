import { TestBed } from '@angular/core/testing';

import { OperacionesComponentInstanceService } from './operaciones-component-instance.service';

describe('OperacionesComponentInstanceService', () => {
  let service: OperacionesComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperacionesComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
