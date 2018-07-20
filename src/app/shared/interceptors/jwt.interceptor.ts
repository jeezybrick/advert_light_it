/*
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
           this.auth.collectFailedRequest(request);
        }
      }
    });
  }
}
*/
