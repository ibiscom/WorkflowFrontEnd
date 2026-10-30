import { TestBed } from '@angular/core/testing';

import { ConsultarPorFlujoService} from './consultarporflujo.service';

describe('ConsultarPorFlujoService', () => {
  let service: ConsultarPorFlujoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultarPorFlujoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

