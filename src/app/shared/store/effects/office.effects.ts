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

  @Effect({dispatch: false})
  addOffice$ = this.action$.pipe(
    ofType(addOfficeRequest),
    map((action) => {
      return this.OFMService.createOffice(action.office),
        ofType(refreshOfficesRequest
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

  @Effect({dispatch: false})
  updateOffice$ = this.action$.pipe(
    ofType(updateOfficeRequest),
    map((action) => {
      return this.OFMService.updateOffice(action.office),
        ofType(refreshOfficesRequest
      );
    }),
  );

  @Effect({dispatch: false})
  deleteOffice$ = this.action$.pipe(
    ofType(deleteOfficeRequest),
    map((action) => {
      return this.OFMService.deleteOffice(action.key),
        ofType((refreshOfficesRequest)
        );
    }),
  );
}
