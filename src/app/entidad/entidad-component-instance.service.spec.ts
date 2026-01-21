import { TestBed } from '@angular/core/testing';

import { EntidadComponentInstanceService } from './entidad-component-instance.service';

describe('EntidadComponentInstanceService', () => {
  let service: EntidadComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntidadComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
