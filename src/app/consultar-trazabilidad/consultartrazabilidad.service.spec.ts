import { TestBed } from '@angular/core/testing';

import { ConsultarTrazabilidadService} from './consultartrazabilidad.service';

describe('ConsultarTrazabilidadService', () => {
  let service: ConsultarTrazabilidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultarTrazabilidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

