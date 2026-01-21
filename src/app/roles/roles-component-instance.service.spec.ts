import { TestBed } from '@angular/core/testing';

import { RolesComponentInstanceService } from './roles-component-instance.service';

describe('RolesComponentInstanceService', () => {
  let service: RolesComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
