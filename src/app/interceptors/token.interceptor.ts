import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import * as firebase from 'firebase/app';
import { AuthService } from '../services';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  auth: AuthService;
  constructor(private inj: Injector) {}

  async intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (request.url.indexOf('oauthCallback') > -1) {
      return next.handle(request);
    }
    this.auth = this.inj.get(AuthService);

    return (await this.auth.getUserIdToken()).pipe(
      switchMap(token => {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(request);
      })
    );
  }

}
