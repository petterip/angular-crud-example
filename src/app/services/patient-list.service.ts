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
  baseUrl = `${this.protocol}://${this.host}:${this.port}/${this.apiVersion}/patient/`;

  constructor(private http: HttpClient) { }

  getPatientList(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl);
    // .pipe(retry(2), catchError(this.handleError.bind(this)));
  }

  // handleError(error: HttpErrorResponse) {
  //   console.error('Error accessing ' + this.baseUrl);
  //   return throwError(error);
  // }
}
