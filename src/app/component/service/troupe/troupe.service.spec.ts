import { TestBed } from '@angular/core/testing';

import { TroupeService } from './troupe.service';

describe('TroupeService', () => {
  let service: TroupeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TroupeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
