import { TestBed } from '@angular/core/testing';

import { ActividadRealizadaPorTareaService} from './actividadrealizadaportarea.service';

describe('ActividadRealizadaPorTareaService', () => {
  let service: ActividadRealizadaPorTareaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadRealizadaPorTareaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

