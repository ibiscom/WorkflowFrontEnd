import { TestBed } from '@angular/core/testing';

import { ActividadRealizadaPorResponsableService} from './actividadrealizadaporresponsable.service';

describe('ActividadRealizadaPorResponsableService', () => {
  let service: ActividadRealizadaPorResponsableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadRealizadaPorResponsableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

