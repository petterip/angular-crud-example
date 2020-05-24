/**
 * Unit test suite for {@class #PatientService}. The API has been generated with {@code ng-openapi-gen}:
 * ```
 * npm run generate-api
 * ```
 *
 * Since ng-openapi-gen does not generate unit tests, test suite is provided separately.
 *
 * For more information:
 * https://github.com/cyclosproject/ng-openapi-gen
 */

import { TestBed } from '@angular/core/testing';
import { PatientService } from '../api/services/patient.service';

describe('PatientListService', () => {
  let service: PatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
