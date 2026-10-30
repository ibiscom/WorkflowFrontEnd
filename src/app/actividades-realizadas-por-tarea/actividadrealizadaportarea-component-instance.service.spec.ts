import { TestBed } from '@angular/core/testing';

import { ActividadRealizadaPorTareaComponentInstanceService } from './actividadrealizadaportarea-component-instance.service';

describe('ActividadRealizadaPorTareaComponentInstanceService', () => {
  let service: ActividadRealizadaPorTareaComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadRealizadaPorTareaComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

