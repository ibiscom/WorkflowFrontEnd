import { TestBed } from '@angular/core/testing';

import { GruposComponentInstanceService } from './grupos-component-instance.service';

describe('GruposComponentInstanceService', () => {
  let service: GruposComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GruposComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
