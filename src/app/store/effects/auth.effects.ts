
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';



import { Actions, Effect , ofType} from '@ngrx/effects';
import { defer, Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { LogoutPromptComponent } from 'src/app/components/auth/logoutprompts.component';
import { AuthService } from 'src/app/services';

import {
  AuthActionTypes,
  AutoLogin,
  AutoLoginSignedOut,
  AutoLoginSuccess,
  Login,
  LoginFailure,
  LoginSuccess,
  Logout,
  LogoutCancelled,
  LogoutComplete,
  LogoutConfirmed,
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  autoLogin$ = this.actions$.pipe(ofType<AutoLogin>(AuthActionTypes.AutoLogin),
    exhaustMap(() =>
      this.authService.autoLogin().pipe(
        map((user) => {
          if (!!user) {
            return new AutoLoginSuccess({ user });
          } else {
            return new AutoLoginSignedOut();
          }
        }),
      ),
    ),
  );

  @Effect()
  login$ = this.actions$.pipe(ofType<Login>(AuthActionTypes.Login),
    map((action) => action.payload),
    exhaustMap((auth) =>
      this.authService.login(auth).pipe(
        map((user) => new LoginSuccess({ user })),
        catchError((error) => of(new LoginFailure(error))),
      ),
    ),
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
      tap(() => {
        // this.router.navigate(['/books']);
        if (this.authService.redirectUrl === '') {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate([this.authService.redirectUrl]);
        }
      }),
    );

  @Effect()
  logoutConfirmation$ = this.actions$
    .pipe(ofType<Logout>(AuthActionTypes.Logout),
      exhaustMap(() =>
        this.dialogService
          .open(LogoutPromptComponent)
          .afterClosed()
          .pipe(
            map((confirmed) => {
              if (confirmed) {
                return new LogoutConfirmed();
              } else {
                return new LogoutCancelled();
              }
            }),
          ),
      ),
    );

  @Effect({ dispatch: false })
  logout$ = this.actions$
    .pipe(ofType<LogoutConfirmed>(AuthActionTypes.LogoutConfirmed),
      exhaustMap((auth) =>
        this.authService.logout().pipe(
          tap(() => this.router.navigate(['/login'])),
          map(() => new LogoutComplete()),
          catchError(() => of(new LogoutComplete())),
        ),
      ),
    );

  @Effect()
  init$: Observable<any> = defer(() => of(null)).pipe(
    map(() => new AutoLogin()),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private dialogService: MatDialog,
  ) {}
}
