import { TestBed } from '@angular/core/testing';

import { ConsultarPorObjetoComponentInstanceService } from './consultarporobjeto-component-instance.service';

describe('ConsultarPorObjetoComponentInstanceService', () => {
  let service: ConsultarPorObjetoComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultarPorObjetoComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

