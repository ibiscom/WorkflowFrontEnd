import { TestBed } from '@angular/core/testing';

import { ObjetowService } from './objetow.service';

describe('TareasService', () => {
  let service: ObjetowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjetowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
