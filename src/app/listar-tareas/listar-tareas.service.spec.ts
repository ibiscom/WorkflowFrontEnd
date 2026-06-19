import { TestBed } from '@angular/core/testing';

import { ListarTareasService } from './listar-tareas.service';

describe('ListarTareasService', () => {
  let service: ListarTareasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListarTareasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
