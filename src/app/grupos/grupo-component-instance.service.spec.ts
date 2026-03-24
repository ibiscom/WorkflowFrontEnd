import { TestBed } from '@angular/core/testing';

import { GrupoComponentInstanceService } from './grupo-component-instance.service';

describe('GrupoComponentInstanceService', () => {
  let service: GrupoComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

