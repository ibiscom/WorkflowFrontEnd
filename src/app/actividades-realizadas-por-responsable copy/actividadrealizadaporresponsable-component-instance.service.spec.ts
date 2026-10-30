import { TestBed } from '@angular/core/testing';

import { ActividadRealizadaPorResponsableComponentInstanceService } from './actividadrealizadaporresponsable-component-instance.service';

describe('ActividadRealizadaPorResponsableComponentInstanceService', () => {
  let service: ActividadRealizadaPorResponsableComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadRealizadaPorResponsableComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

