import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, Effect } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';

import { OfficemanService } from '../../services';
import {
  addOfficeRequest,
  deleteOfficeRequest,
  getOfficeDone,
  getOfficeRequest,
  refreshOfficesDone,
  refreshOfficesRequest,
  updateOfficeRequest
} from '../actions/office.actions';
import { Office } from '../../models';

@Injectable()
export class OfficeEffects {
  constructor(private OFMService: OfficemanService, private action$: Actions, private store: Store) {

  }

  // @Effect()
  refreshOffices$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(refreshOfficesRequest),
    mergeMap(() => this.OFMService.getAll()
      .pipe(
        map(offices => refreshOfficesDone({ offices })),
        catchError(() => EMPTY)
      ))
  )
  );

  @Effect()
  addOffice$ = this.action$.pipe(
    ofType(addOfficeRequest),
    switchMap((action) => {
      return this.OFMService.createOffice(action.office).pipe(
        map(() => this.store.dispatch(refreshOfficesRequest()))
      );
    })
  );

  @Effect()
  getOffice$ = this.action$.pipe(
    ofType(getOfficeRequest),
    switchMap((action) => this.OFMService.getOffice(action.key)
    .pipe(
      map((office: Office) =>  getOfficeDone({ office })))
    )
  );

  @Effect()
  updateOffice$ = this.action$.pipe(
    ofType(updateOfficeRequest),
    mergeMap((action) => {
      return this.OFMService.updateOffice(action.office).pipe(
        map(() => refreshOfficesRequest())
      );
    }),
  );

  @Effect()
  deleteOffice$ = this.action$.pipe(
    ofType(deleteOfficeRequest),
    switchMap((action) => {
      return this.OFMService.deleteOffice(action.key).pipe(
        map(() => of(this.store.dispatch(refreshOfficesRequest()))
        ));
    }),
  );
}
