import { TestBed } from '@angular/core/testing';

import { FestivoComponentInstanceService } from './festivo-component-instance.service';

describe('FestivoComponentInstanceService', () => {
  let service: FestivoComponentInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FestivoComponentInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
