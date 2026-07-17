import { TestBed } from '@angular/core/testing';

import { FinalizarprocesoComponentInstanceService } from './finalizarproceso-component-instance.service';

describe('FinalizarprocesoComponentInstanceService', () => {
  let service: FinalizarprocesoComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinalizarprocesoComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

