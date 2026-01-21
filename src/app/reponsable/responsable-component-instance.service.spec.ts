import { TestBed } from '@angular/core/testing';

import { ResponsableComponentInstanceService } from './responsable-component-instance.service';

describe('ResponsableComponentInstanceService', () => {
  let service: ResponsableComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsableComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
