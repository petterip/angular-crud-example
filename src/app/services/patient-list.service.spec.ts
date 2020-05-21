import { TestBed } from '@angular/core/testing';

import { PatientListService } from './patient-list.service';

describe('PatientListService', () => {
  let service: PatientListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
