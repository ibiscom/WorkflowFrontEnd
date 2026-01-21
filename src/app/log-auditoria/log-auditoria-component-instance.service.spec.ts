import { TestBed } from '@angular/core/testing';

import { LogAuditoriaComponentInstanceService } from './log-auditoria-component-instance.service';

describe('LogAuditoriaComponentInstanceService', () => {
  let service: LogAuditoriaComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogAuditoriaComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
