import { TestBed } from '@angular/core/testing';

import { SincActiveDirectoryService } from './sinc-active-directory.service';

describe('SincActiveDirectoryService', () => {
  let service: SincActiveDirectoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SincActiveDirectoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
