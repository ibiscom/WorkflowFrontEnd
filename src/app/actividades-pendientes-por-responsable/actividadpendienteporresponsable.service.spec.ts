import { TestBed } from '@angular/core/testing';

import { ActividadPendientePorResponsableService} from './actividadpendienteporresponsable.service';

describe('ActividadPendientePorResponsableService', () => {
  let service: ActividadPendientePorResponsableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadPendientePorResponsableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

