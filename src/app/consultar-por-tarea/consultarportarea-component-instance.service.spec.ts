import { TestBed } from '@angular/core/testing';

import { ConsultarPorTareaComponentInstanceService } from './consultarportarea-component-instance.service';

describe('ConsultarPorTareaComponentInstanceService', () => {
  let service: ConsultarPorTareaComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultarPorTareaComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

