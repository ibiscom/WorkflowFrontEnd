import { TestBed } from '@angular/core/testing';

import { ConsultarRolResponsableService } from './consultarrolresponsable.service';

describe('ConsultarRolResponsableService', () => {
  let service: ConsultarRolResponsableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultarRolResponsableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
