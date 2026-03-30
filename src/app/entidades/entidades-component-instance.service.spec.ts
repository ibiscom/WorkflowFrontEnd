import { TestBed } from '@angular/core/testing';

import { EntidadesComponentInstanceService } from './entidades-component-instance.service';

describe('EntidadesComponentInstanceService', () => {
  let service: EntidadesComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntidadesComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
