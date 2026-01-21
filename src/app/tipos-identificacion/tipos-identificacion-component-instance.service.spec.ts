import { TestBed } from '@angular/core/testing';

import { TiposIdentificacionComponentInstanceService } from './tipos-identificacion-component-instance.service';

describe('TiposIdentificacionComponentInstanceService', () => {
  let service: TiposIdentificacionComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposIdentificacionComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
