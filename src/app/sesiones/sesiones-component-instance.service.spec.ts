import { TestBed } from '@angular/core/testing';

import { SesionesComponentInstanceService } from './sesiones-component-instance.service';

describe('SesionesComponentInstanceServiceService', () => {
  let service: SesionesComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesionesComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
