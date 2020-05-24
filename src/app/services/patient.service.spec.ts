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
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PatientService', () => {
  let service: PatientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    // Mock the HttpClient for PatientService
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PatientService]
    });
    service = TestBed.inject(PatientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Make sure that there are no outstanding requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return GET /patient', () => {
    const dummyPatients = [
      {
        id: 1,
        name: 'John Smith',
        project: 'project A',
        attachment: 'file1.ext',
        match: 78.55
      },
      {
        id: 2,
        name: 'Maria Brady',
        project: 'project B',
        attachment: 'file2.ext',
        match: 85.15
      }
    ];
    const rootUrl = 'https://patient-repository-api.herokuapp.com';
    const getPatientsPath = '/api/patient/';

    service.getPatients().subscribe(patients => {
      expect(patients.length).toBe(2);
      expect(patients).toEqual(dummyPatients);
    });

    const req = httpMock.expectOne(`${rootUrl}${getPatientsPath}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPatients);
  });
});
