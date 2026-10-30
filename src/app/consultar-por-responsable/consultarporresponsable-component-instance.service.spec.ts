import { TestBed } from '@angular/core/testing';

import { ConsultarPorResponsableComponentInstanceService } from './consultarporresponsable-component-instance.service';

describe('ConsultarPorResponsableComponentInstanceService', () => {
  let service: ConsultarPorResponsableComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultarPorResponsableComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

