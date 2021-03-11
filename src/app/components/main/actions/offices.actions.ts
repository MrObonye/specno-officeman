import { createAction, props } from '@ngrx/store';
import { Office } from 'src/app/models';

export const officesLoad = createAction('[Offices Page] Load Offices');
export const officesLoaded = createAction('[Offices Page] Load Offices Success', props<{ offices: Office[] }>());
export const officesLoadFail = createAction('Offices Page] Load Offices Failed');

export const officeAdd = createAction('[Offices Page] Add Office', props<{ office: Office }>());
export const officeDelete = createAction('[Office Page] Delete Page', props<{ key: string }>());
export const officeEdit = createAction('[Office Page] Edit Office', props<{ office: Office }>());
export const getOffice = createAction('[Office Details] Load Office', props<{key: string}>());
export const getOfficeSuccess = createAction('[Office Details] Load Details Success', props<{office: Office}>());
