import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Patient } from '../models/patient';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientListService {
  protocol = 'http';
  host = 'patient-repository-api.herokuapp.com';
  port = '80';
  apiVersion = 'api';
  baseUrl = `${this.protocol}://${this.host}:${this.port}/${this.apiVersion}`;

  constructor(private http: HttpClient) { }

  getPatientList(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl + '/patient/');
  }

  putPatient(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(this.baseUrl + `/patient/${patient.id}/`, patient);
  }
  postPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.baseUrl + `/patient/`, patient);
  }
}
