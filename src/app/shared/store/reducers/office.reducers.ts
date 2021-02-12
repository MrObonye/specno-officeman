/*
A reducer hosts selectors to retrieve a list of Offices or an
Office from the NgRx store to the components that consumes
the state

*/
import { createReducer, on } from '@ngrx/store';
import { Office } from '../../models';

import {refreshOfficesDone } from './../actions/office.actions';
import {getOfficeDone} from './../actions/office.actions';

export const officesReducer = createReducer<Office[]>([],
on(refreshOfficesDone, (_, action) => action.offices));

const office = new Office();

export const officeReducer = createReducer<Office>(office,
    on(getOfficeDone, (_, action) => action.office));
