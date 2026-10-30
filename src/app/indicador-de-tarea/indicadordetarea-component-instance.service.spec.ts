import { TestBed } from '@angular/core/testing';

import { IndicadorDeTareaComponentInstanceService } from './indicadordetarea-component-instance.service';

describe('IndicadorDeTareaComponentInstanceService', () => {
  let service: IndicadorDeTareaComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicadorDeTareaComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

