import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root',
})
export class PatientService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getPatient
   */
  static readonly GetPatientPath = '/api/patient/{patientId}';

  /**
   * Find a patient.
   *
   * Use this endpoint to find an existing patient by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatient()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatient$Response(params: {

    /**
     * Id of the patient record to be fetched
     */
    patientId: number;

  }): Observable<StrictHttpResponse<Patient>> {

    const rb = new RequestBuilder(this.rootUrl, PatientService.GetPatientPath, 'get');
    if (params) {

      rb.path('patientId', params.patientId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Patient>;
      })
    );
  }

  /**
   * Find a patient.
   *
   * Use this endpoint to find an existing patient by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatient$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatient(params: {

    /**
     * Id of the patient record to be fetched
     */
    patientId: number;

  }): Observable<Patient> {

    return this.getPatient$Response(params).pipe(
      map((r: StrictHttpResponse<Patient>) => r.body as Patient)
    );
  }

  /**
   * Path part for operation updatePatient
   */
  static readonly UpdatePatientPath = '/api/patient/{patientId}';

  /**
   * Update a patient.
   *
   * Use this endpoint to update an existing patient record
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePatient()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatient$Response(params: {

    /**
     * Id of the patient record to be updated
     */
    patientId: number;
    body: Patient
  }): Observable<StrictHttpResponse<Patient>> {

    const rb = new RequestBuilder(this.rootUrl, PatientService.UpdatePatientPath, 'put');
    if (params) {

      rb.path('patientId', params.patientId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Patient>;
      })
    );
  }

  /**
   * Update a patient.
   *
   * Use this endpoint to update an existing patient record
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePatient$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatient(params: {

    /**
     * Id of the patient record to be updated
     */
    patientId: number;
    body: Patient
  }): Observable<Patient> {

    return this.updatePatient$Response(params).pipe(
      map((r: StrictHttpResponse<Patient>) => r.body as Patient)
    );
  }

  /**
   * Path part for operation getPatients
   */
  static readonly GetPatientsPath = '/api/patient/';

  /**
   * List all patients.
   *
   * Use this endpoint to fetch a list of all the patients
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPatients()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatients$Response(params?: {

  }): Observable<StrictHttpResponse<Array<Patient>>> {

    const rb = new RequestBuilder(this.rootUrl, PatientService.GetPatientsPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Patient>>;
      })
    );
  }

  /**
   * List all patients.
   *
   * Use this endpoint to fetch a list of all the patients
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPatients$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPatients(params?: {

  }): Observable<Array<Patient>> {

    return this.getPatients$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Patient>>) => r.body as Array<Patient>)
    );
  }

  /**
   * Path part for operation postPatient
   */
  static readonly PostPatientPath = '/api/patient/add';

  /**
   * Create a new patient.
   *
   * Use this endpoint to create a new patient record
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postPatient()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postPatient$Response(params: {
    body: Patient
  }): Observable<StrictHttpResponse<Patient>> {

    const rb = new RequestBuilder(this.rootUrl, PatientService.PostPatientPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Patient>;
      })
    );
  }

  /**
   * Create a new patient.
   *
   * Use this endpoint to create a new patient record
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postPatient$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postPatient(params: {
    body: Patient
  }): Observable<Patient> {

    return this.postPatient$Response(params).pipe(
      map((r: StrictHttpResponse<Patient>) => r.body as Patient)
    );
  }

  /**
   * Path part for operation deletePatient
   */
  static readonly DeletePatientPath = '/api/patient/delete/{patientId}';

  /**
   * Delete a patient.
   *
   * Delete an existing patient
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePatient()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatient$Response(params: {
    patientId: number;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PatientService.DeletePatientPath, 'delete');
    if (params) {

      rb.path('patientId', params.patientId, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete a patient.
   *
   * Delete an existing patient
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deletePatient$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePatient(params: {
    patientId: number;

  }): Observable<void> {

    return this.deletePatient$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
