import { Injectable } from '@angular/core';
import { UserModel, Authenticate } from './../../models';

import { from, Observable, ReplaySubject, of, merge } from 'rxjs';
import { filter, map, take, share, exhaustMap, switchMap } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';

const mockUser = { name: 'Brandon', email: 'test@example.com' };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public redirectUrl = '';

  private signedIn$: Observable<UserModel>;
  private signedInSignedOut$: Observable<UserModel>;
  private signedOut$: Observable<UserModel>;

  constructor(
    private readonly afAuth: AngularFireAuth
  ) {
    const firebaseAuth$ = this.afAuth.authState.pipe(share());

    this.signedIn$ = firebaseAuth$.pipe(filter((firebaseUser) => !!firebaseUser),
    exhaustMap(() => {
      const user: UserModel = {
        email: mockUser.email,
        name: mockUser.name,
      };
      return of(user);
    }));
    this.signedOut$ = firebaseAuth$.pipe(
      filter((firebaseUser) => !!!firebaseUser),
      map(() => null)
    );
    this.signedInSignedOut$ = merge(this.signedIn$, this.signedOut$);
  }

  autoLogin(): Observable<UserModel> {
    return this.signedInSignedOut$.pipe(take(1));
  }
  login(auth: Authenticate): Observable<UserModel> {
    const result$ = from(
      this.afAuth.signInWithEmailAndPassword('test@example.com', 'Password')
    ).pipe(
      switchMap(() => {
        return this.signedIn$.pipe(take(1));
      })
    );
    return result$;
  }
  public logout(): Observable<boolean> {
    const result$ = from(this.afAuth.signOut()).pipe(
      switchMap(() => {
        return this.signedOut$.pipe(
          take(1),
          map(() => true)
        );
      })
    );
    return result$;
  }
}
