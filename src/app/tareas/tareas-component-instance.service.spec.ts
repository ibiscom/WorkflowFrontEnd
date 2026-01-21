import { TestBed } from '@angular/core/testing';

import { TareasComponentInstanceService } from './tareas-component-instance.service';

describe('TareasComponentInstanceService', () => {
  let service: TareasComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareasComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
