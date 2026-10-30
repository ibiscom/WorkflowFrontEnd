import { TestBed } from '@angular/core/testing';

import { ActividadPendientePorResponsableComponentInstanceService } from './actividadpendienteporresponsable-component-instance.service';

describe('ActividadPendientePorResponsableComponentInstanceService', () => {
  let service: ActividadPendientePorResponsableComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadPendientePorResponsableComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

