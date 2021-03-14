import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, Effect } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';


import {
  addStaffRequest,
  deleteStaffRequest,
  getStaffDone,
  getStaffRequest,
  refreshStaffMembersDone,
  refreshStaffMembersRequest,
  updateStaffRequest
} from '../actions/staff.actions';
import { OfficemanService } from 'src/app/shared';


@Injectable()
export class StaffEffects {
  constructor(private OFMService: OfficemanService, private action$: Actions, private store: Store) {

  }

  // @Effect()
  refreshStaffs$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(refreshStaffMembersRequest),
    switchMap((action) => this.OFMService.getAllStaff(action.key)
      .pipe(
        map(staffMembers => refreshStaffMembersDone({ staffMembers })),
        catchError(() => EMPTY)
      ))
  )
  );

  @Effect()
  addStaff$ = this.action$.pipe(
    ofType(addStaffRequest),
    map((action) => action.staffMember),
    map(staff => this.OFMService.createStaff(staff)),
    ofType(refreshStaffMembersRequest),
  );

  /* @Effect()
  getStaff$ = this.action$.pipe(
    ofType(getStaffRequest),
    switchMap((action) => this.OFMService.getStaff(action.key)
    .pipe(
      map((office: Staff) =>  getStaffDone({ staff })))
    )
  ); */

  @Effect({ dispatch: false })
  updateStaff$ = this.action$.pipe(
    ofType(updateStaffRequest),
    map((action) => this.OFMService.updateStaff(action.staffMember),
      ofType(refreshStaffMembersRequest))
  );

  @Effect({ dispatch: false })
  deleteStaff$ = this.action$.pipe(
    ofType(deleteStaffRequest),
    map((action) => {
      return this.OFMService.deleteStaff(action.staffMember),
        ofType((refreshStaffMembersRequest));
    }),
  );
}
