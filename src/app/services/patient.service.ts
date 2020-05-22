/**
 * Patient Repository API
 * Demo for RESTful API created with Spring Boot with OpenAPI documentation.
 */

import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { CustomHttpUrlEncodingCodec } from '../encoder';
import { Patient } from '../models/patient';
import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable()
export class PatientService {
  protocol = 'http';
  host = 'patient-repository-api.herokuapp.com';
  port = '80';
  apiVersion = 'api';
  baseUrl = `${this.protocol}://${this.host}:${this.port}`;

  protected basePath = this.baseUrl + '/';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(
    protected httpClient: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string,
    @Optional() configuration: Configuration
  ) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    for (const consume of consumes) {
      if (form === consume) {
        return true;
      }
    }
    return false;
  }

  /**
   * Delete a patient
   * Delete an existing patient
   * @param patientId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deletePatient(
    patientId: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public deletePatient(
    patientId: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public deletePatient(
    patientId: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public deletePatient(
    patientId: number,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (patientId === null || patientId === undefined) {
      throw new Error(
        'Required parameter patientId was null or undefined when calling deletePatient.'
      );
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['*/*'];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<any>(
      'delete',
      `${this.basePath}/api/patient/delete/${encodeURIComponent(
        String(patientId)
      )}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * Find a patient
   * Use this endpoint to find an existing patient by id
   * @param patientId Id of the patient record to be fetched
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getPatient(
    patientId: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Patient>;
  public getPatient(
    patientId: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Patient>>;
  public getPatient(
    patientId: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Patient>>;
  public getPatient(
    patientId: number,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (patientId === null || patientId === undefined) {
      throw new Error(
        'Required parameter patientId was null or undefined when calling getPatient.'
      );
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['*/*'];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<Patient>(
      'get',
      `${this.basePath}/api/patient/${encodeURIComponent(String(patientId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * List all patients
   * Use this endpoint to fetch a list of all the patients
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getPatients(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<Patient>>;
  public getPatients(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<Patient>>>;
  public getPatients(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<Patient>>>;
  public getPatients(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['application/json', '*/*'];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    console.warn("in getPatients", { headers, with: this.configuration.withCredentials });
    return this.httpClient.request<Array<Patient>>(
      'get',
      `${this.basePath}/api/patient/`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * Create a new patient
   * Use this endpoint to create a new patient record
   * @param body
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public postPatient(
    body: Patient,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Patient>;
  public postPatient(
    body: Patient,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Patient>>;
  public postPatient(
    body: Patient,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Patient>>;
  public postPatient(
    body: Patient,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (body === null || body === undefined) {
      throw new Error(
        'Required parameter body was null or undefined when calling postPatient.'
      );
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['*/*'];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected:
      | string
      | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<Patient>(
      'post',
      `${this.basePath}/api/patient/add`,
      {
        body: body,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * Update a patient
   * Use this endpoint to update an existing patient record
   * @param body
   * @param patientId Id of the patient record to be updated
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updatePatient(
    body: Patient,
    patientId: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Patient>;
  public updatePatient(
    body: Patient,
    patientId: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Patient>>;
  public updatePatient(
    body: Patient,
    patientId: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Patient>>;
  public updatePatient(
    body: Patient,
    patientId: number,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (body === null || body === undefined) {
      throw new Error(
        'Required parameter body was null or undefined when calling updatePatient.'
      );
    }

    if (patientId === null || patientId === undefined) {
      throw new Error(
        'Required parameter patientId was null or undefined when calling updatePatient.'
      );
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['*/*'];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected:
      | string
      | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<Patient>(
      'put',
      `${this.basePath}/api/patient/${encodeURIComponent(String(patientId))}`,
      {
        body: body,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }
}
