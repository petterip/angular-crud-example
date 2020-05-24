import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientListComponent } from './patient-list.component';
import { PatientService } from '../../api/services/patient.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SpinnerComponent } from '../spinner/spinner.component';

// Load the implementations that should be tested

describe('PatientListComponent', () => {
  let component: PatientListComponent;
  let fixture: ComponentFixture<PatientListComponent>;

  let service: PatientService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PatientListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PatientListComponent,
        SpinnerComponent
      ],
      imports: [HttpClientTestingModule],
      providers: [PatientService]
    });
    service = TestBed.inject(PatientService);
    httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(PatientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    const dummyUsers = [
      {
        id: 1,
        name: 'John Smith',
        project: 'project A',
        attachment: 'file1.ext',
        match: 78.55
      }
    ];
    const rootUrl = 'https://patient-repository-api.herokuapp.com';
    const getPatientsPath = '/api/patient/';

    expect(component).toBeTruthy();

    const req = httpMock.expectOne(`${rootUrl}${getPatientsPath}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });
});
