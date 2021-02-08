import { Injectable} from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as officeActions from './../actions/office.actions';
import {
  AddOffice,
  AddOfficeError,
  AddOfficeSuccess,
  GetAllOffices,
  GetAllOfficesSuccess,
  GetAllOfficesError,
  UpdateOffice,
  UpdateOfficeError,
  UpdateOfficeSuccess,
  RemoveOffice,
  RemoveOfficeError,
  RemoveOfficeSuccess
} from './../actions/office.actions';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { OfficemanService } from './../../services';
import { Office } from './../../models';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class OfficeEffects {
  constructor(private actions$: Actions, private officeManService: OfficemanService) { }

  @Effect()
  getOffices$: Observable<Action> = this.actions$.pipe(
    ofType(officeActions.GET_OFFICES),
    switchMap(() => this.officeManService.getAll()),
    map(offices => new GetAllOfficesSuccess(offices)),
    catchError((err) => [new GetAllOfficesError(err)])
  );

  @Effect()
  createOffice$ = this.actions$.pipe(
    ofType(officeActions.CREATE_OFFICE),
      map((action: AddOffice) => action.payload),
      switchMap((newOffice: Office) => this.officeManService.createOffice(newOffice)),
      map(() => new AddOfficeSuccess()),
      catchError((err) => [new AddOfficeError(err)])
    );

  @Effect()
  updateOffice$ = this.actions$.pipe(
    ofType(officeActions.UPDATE_OFFICE),
    map((action: UpdateOffice) => action.payload),
    switchMap((office: Office) => this.officeManService.updateOffice(office)),
    map(() => new UpdateOfficeSuccess()),
    catchError((err) => [new UpdateOfficeError(err)])
  );
  @Effect()
  removeOffice$ =  this.actions$.pipe(
    ofType(officeActions.DELETE_OFFICE),
    map((action: RemoveOffice) => action.payload),
    switchMap(key => this.officeManService.deleteOffice(key)),
    map((office: Office) => new RemoveOfficeSuccess(office)),
    catchError((err) => [new RemoveOfficeError(err)])
  );
}

