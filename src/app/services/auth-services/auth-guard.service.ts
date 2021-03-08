import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';
import * as fromStore from '../../store/state';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, filter, map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private readonly auth$: AngularFireAuth,
    private store: Store<fromStore.State>,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const url: string = state.url;
    console.log('ulr>', url);
    this.authService.redirectUrl = url;

    return this.checkStoreAuthentication().pipe(
      map((storeOrApiAuth) => {
        if (!storeOrApiAuth) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      }),
    );
  }

  checkStoreAuthentication(): Observable<boolean> {
    return this.store.select(fromStore.selectHasChecked).pipe(
      filter((hasChecked) => hasChecked),
      exhaustMap(() =>
        this.store.select(fromStore.selectIsLoggedIn).pipe(take(1)))
    );
  }
}
