import { TestBed } from '@angular/core/testing';

import { DistribuirtareaService } from './distribuirtarea.service';

describe('DistribuirtareaService', () => {
  let service: DistribuirtareaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistribuirtareaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

