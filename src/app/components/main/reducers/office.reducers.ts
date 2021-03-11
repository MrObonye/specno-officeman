import { Action, createReducer, on } from '@ngrx/store';
import { Office } from 'src/app/models';
import * as OfficePageActions from './../actions/offices.actions';

export interface State {
  offices: Office[];
  office: Office;
  key: string;
}
// export const initialState: State = {
//   offices: [],
// };

export const reducers = createReducer<Office[]>(
  [],
  on(OfficePageActions.officesLoaded, (_, action) => action.offices),
  // TODO reducer for when staff is added and
);
const office = new Office();
export const reducer = createReducer<Office>(
  office,
  on(OfficePageActions.officeAdd, (_, action) => action.office),
  on(OfficePageActions.officeEdit, (_, action) => action.office),
);
export const delOfficeReducer = createReducer<string> (
  '',
  on(OfficePageActions.officeDelete, (_, action) => action.key),
);


