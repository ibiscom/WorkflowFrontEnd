import { TestBed } from '@angular/core/testing';

import { ConsultarPorResponsableService} from './consultarporresponsable.service';

describe('ConsultarPorResponsableService', () => {
  let service: ConsultarPorResponsableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultarPorResponsableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

