import { TestBed } from '@angular/core/testing';

import { ListarTareaComponentInstanceService } from './listar-tareas-component-instance.service';

describe('ListarTareaComponentInstanceService', () => {
  let service: ListarTareaComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListarTareaComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
