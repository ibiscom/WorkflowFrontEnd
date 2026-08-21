import { TestBed } from '@angular/core/testing';

import { SimulacionComponentInstanceService } from './simulacion-component-instance.service';

describe('SimulacionComponentInstanceService', () => {
  let service: SimulacionComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimulacionComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

