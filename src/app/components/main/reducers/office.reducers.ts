import { Action, createReducer, on } from '@ngrx/store';
import { Office } from 'src/app/models';
import * as OfficePageActions from './../actions/offices.actions';

export interface State {
  offices: Office[];
}
// export const initialState: State = {
//   offices: [],
// };

export const reducers = createReducer<Office[]>(
  [],
  on(OfficePageActions.officesLoaded,  (_, action) => action.offices),
  // TODO reducer for when staff is added and
);


