import { TestBed } from '@angular/core/testing';

import { ConsultarPorTareaService} from './consultarportarea.service';

describe('ConsultarPorTareaService', () => {
  let service: ConsultarPorTareaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultarPorTareaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

