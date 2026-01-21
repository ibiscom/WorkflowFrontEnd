import { TestBed } from '@angular/core/testing';

import { EventoinicioComponentInstanceService} from './eventoinicio-component-instance.service';

describe('EventoinicioComponentInstanceService', () => {
  let service: EventoinicioComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventoinicioComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
