import { TestBed } from '@angular/core/testing';

import { IndicadorDeFlujoService} from './indicadordeflujo.service';

describe('IndicadorDeFlujoService', () => {
  let service: IndicadorDeFlujoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicadorDeFlujoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

