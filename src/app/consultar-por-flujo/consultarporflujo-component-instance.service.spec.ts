import { TestBed } from '@angular/core/testing';

import { ConsultarPorFlujoComponentInstanceService } from './consultarporflujo-component-instance.service';

describe('ConsultarPorFlujoComponentInstanceService', () => {
  let service: ConsultarPorFlujoComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultarPorFlujoComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

