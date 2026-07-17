import { TestBed } from '@angular/core/testing';

import { FinalizarprocesoService } from './finalizarproceso.service';

describe('FinalizarprocesosService', () => {
  let service: FinalizarprocesoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinalizarprocesoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

