import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  retryOnFail = 2;

  constructor() { }
  handleError(error: HttpErrorResponse) {
    console.warn(`Error while accessing ${error.url}: ${error.error.error}`);
    console.log(error);
    return throwError(error);
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(retry(this.retryOnFail), catchError(this.handleError));
  }
}
