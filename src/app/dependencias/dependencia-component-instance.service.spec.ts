import { TestBed } from '@angular/core/testing';

import { DependenciaComponentInstanceService } from './dependencia-component-instance.service';

describe('DependenciaComponentInstanceService', () => {
  let service: DependenciaComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DependenciaComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
