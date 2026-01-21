import { TestBed } from '@angular/core/testing';

import { ReestablecerPasswordService } from './reestablecer-password.service';

describe('ReestablecerPasswordService', () => {
  let service: ReestablecerPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReestablecerPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
