import { TestBed } from '@angular/core/testing';

import { IndicadorDeFlujoComponentInstanceService } from './indicadordeflujo-component-instance.service';

describe('IndicadorDeFlujoComponentInstanceService', () => {
  let service: IndicadorDeFlujoComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicadorDeFlujoComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

