import { TestBed } from '@angular/core/testing';

import { PerfilesComponentInstanceService } from './perfiles-component-instance.service';

describe('PerfilesComponentInstanceService', () => {
  let service: PerfilesComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilesComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
