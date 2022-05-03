/* import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler.
@Injectable()
export class NoopInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req);
  }
} */

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Put } from 'aws-sdk/clients/dynamodb';

@Injectable()
 export class HeaderInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

            const IdAuthToken = String(sessionStorage.getItem('id_token'));
            console.log('Interceptor: setting auth header');
        return next.handle(httpRequest.clone({ setHeaders: { 'Authorization': IdAuthToken } }));
        /*return next.handle(httpRequest.clone({ setHeaders: { "Content-Type": "text/plain"} }));*/
  } 
}
