import { TestBed } from '@angular/core/testing';

import { DatosCorporativosService } from './datos-corporativos.service';

describe('DatosCorporativosService', () => {
  let service: DatosCorporativosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosCorporativosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
