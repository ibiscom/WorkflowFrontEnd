import { TestBed } from '@angular/core/testing';

import { IndicadorDeTareaService} from './indicadordetarea.service';

describe('IndicadorDeTareaService', () => {
  let service: IndicadorDeTareaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicadorDeTareaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

