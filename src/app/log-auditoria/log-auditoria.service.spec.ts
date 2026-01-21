import { TestBed } from '@angular/core/testing';

import { LogAuditoriaService } from './log-auditoria.service';

describe('LogAuditoriaService', () => {
  let service: LogAuditoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogAuditoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
