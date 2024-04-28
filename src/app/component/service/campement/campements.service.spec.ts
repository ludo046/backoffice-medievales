import { TestBed } from '@angular/core/testing';

import { CampementsService } from './campements.service';

describe('CampementsService', () => {
  let service: CampementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
