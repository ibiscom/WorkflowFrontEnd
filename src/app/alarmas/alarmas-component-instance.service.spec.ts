import { TestBed } from '@angular/core/testing';

import { AlarmaComponentInstanceService } from './alarmas-component-instance.service';

describe('AlarmaComponentInstanceService', () => {
  let service: AlarmaComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlarmaComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

