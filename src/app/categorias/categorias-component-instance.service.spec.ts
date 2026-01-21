import { TestBed } from '@angular/core/testing';

import { CategoriasComponentInstanceService } from './categorias-component-instance.service';

describe('CategoriasComponentInstanceService', () => {
  let service: CategoriasComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriasComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
