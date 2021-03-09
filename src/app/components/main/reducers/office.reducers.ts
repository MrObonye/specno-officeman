import { Action, createReducer, on } from '@ngrx/store';
import { Office } from 'src/app/models';
import * as OfficePageActions from './../actions/offices.actions';

export interface State {
  offices: Office[];
}
export const initialState: State = {
  offices: [],
};

const officeReducer = createReducer<State>(
  initialState,
  on(OfficePageActions.officesLoaded,  (state, action) => ({...state, offices: action.offices})), // review
);

export function reducers(state: State | undefined, action: Action): State {
  return officeReducer(state, action);
}
