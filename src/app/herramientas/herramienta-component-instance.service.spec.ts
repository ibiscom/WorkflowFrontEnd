import { TestBed } from '@angular/core/testing';

import { HerramientaComponentInstanceService } from './herramienta-component-instance.service';

describe('HerramientaComponentInstanceService', () => {
  let service: HerramientaComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HerramientaComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

