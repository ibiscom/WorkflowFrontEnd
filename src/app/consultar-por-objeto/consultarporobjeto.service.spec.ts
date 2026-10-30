import { TestBed } from '@angular/core/testing';

import { ConsultarPorObjetoService} from './consultarporobjeto.service';

describe('ConsultarPorObjetoService', () => {
  let service: ConsultarPorObjetoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultarPorObjetoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

