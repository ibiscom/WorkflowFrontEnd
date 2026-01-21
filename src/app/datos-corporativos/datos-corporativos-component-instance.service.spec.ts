import { TestBed } from '@angular/core/testing';

import { DatosCorporativosComponentInstanceService } from './datos-corporativos-component-instance.service';

describe('DatosCorporativosComponentInstanceService', () => {
  let service: DatosCorporativosComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosCorporativosComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
