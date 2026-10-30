import { TestBed } from '@angular/core/testing';

import { ConsultarTrazabilidadComponentInstanceService } from './consultartrazabilidad-component-instance.service';

describe('ConsultarTrazabilidadComponentInstanceService', () => {
  let service: ConsultarTrazabilidadComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultarTrazabilidadComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

