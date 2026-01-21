import { TestBed } from '@angular/core/testing';

import { LogsAccesoComponentInstanceService } from './logs-acceso-component-instance.service';

describe('LogsAccesoComponentInstanceService', () => {
  let service: LogsAccesoComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogsAccesoComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
