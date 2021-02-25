import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Authenticate } from 'src/app/models';
import { Login } from 'src/app/store/actions/auth.actions';
import * as fromStore from './../../../store/state';

@Component({
  selector: 'app-login-page',
  template: `
    <app-login-form
      [error]="error$ | async"
      [disabled]="pending$ | async"
      (submitted)="onLogin($event)">
    </app-login-form>
  `,
  styles: [
    `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 128px 12px 12px 12px;
    }
    app-login-form {
      width: 100%;
      min-width: 250px;
      max-width: 300px;
    }
  `,
  ],
})
export class LoginPageComponent implements OnInit {

  error$ = this.store.select(fromStore.selectLoginPageError);
  pending$ = this.store.select(fromStore.selectLoginPagePending);

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {}

  onLogin(credentials: Authenticate) {
    this.store.dispatch(new Login(credentials));
  }

}
