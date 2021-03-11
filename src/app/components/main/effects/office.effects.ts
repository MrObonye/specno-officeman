import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import { OfficemanService } from 'src/app/shared';
import { officeAdd, officeDelete, officeEdit, officesLoad, officesLoaded } from '../actions/offices.actions';

@Injectable()
export class OfficeEffects {
  constructor(private OFMService: OfficemanService, private action$: Actions, private store: Store) {

  }

  /* listens to actions for the refreshOfficeRequest action
    when the action is dispatched the effect calls getAll method from
    officeservice to retrieve all offices from firebase and saves them to the Ngrx store
  */
  loadCollection$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(officesLoad),
    mergeMap(() => this.OFMService.getAll()
      .pipe(
        map(offices => {
          // console.log(offices);
          return officesLoaded({ offices });
        }),
        catchError(() => EMPTY)
      ))
  ));

  @Effect({dispatch: false})
  addOffice$ = this.action$.pipe(
    ofType(officeAdd),
    map((action) => {
      return this.OFMService.createOffice(action.office),
      ofType(officesLoad);
    })
  );

  @Effect({dispatch: false})
  editOffice$ = this.action$.pipe(
    ofType(officeEdit),
    map((action) => {
      return this.OFMService.updateOffice(action.office),
      ofType(officesLoad);
    })
  );
  @Effect({dispatch: false})
  deleteOffice$ = this.action$.pipe(
    ofType(officeDelete),
    map((action) => this.OFMService.deleteOffice(action.key)
    )
  );
}
