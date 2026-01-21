import { TestBed } from '@angular/core/testing';

import { EventoinicioService } from './eventoinicio.service';

describe('EventoinicioService', () => {
  let service: EventoinicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventoinicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
