import { createAction, props } from '@ngrx/store';
import { Office } from '../../models';

export const refreshOfficesRequest = createAction('[Office] Refresh Office Request');
export const refreshOfficesDone = createAction('[Office] Refresh Offices Done', props<{offices: Office[]}>());
export const getOfficeRequest = createAction('[Office] Get Office Request', props<{key: string}>());
export const getOfficeDone = createAction('[Office] Get Office Request Done', props<{office: Office}>());
export const addOfficeRequest = createAction('[Office] Add Office Request', props<{office: Office}>());
export const updateOfficeRequest = createAction('[Office] Update Office Request', props<{office: Office}>());
export const deleteOfficeRequest = createAction('[Office] Delete Office Request', props<{key: string}>());


