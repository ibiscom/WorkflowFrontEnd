import { TestBed } from '@angular/core/testing';

import { LogsAccesoService } from './logs-acceso.service';

describe('LogsAccesoService', () => {
  let service: LogsAccesoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogsAccesoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
