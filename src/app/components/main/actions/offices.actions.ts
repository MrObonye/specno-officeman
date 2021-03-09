import { createAction, props } from '@ngrx/store';
import { Office } from 'src/app/models';

export const officesLoad = createAction('[Offices Page] Load Offices');
export const officesLoaded = createAction('[Offices Page] Load Offices Success', props<{offices: Office[]}>());
export const officesLoadFail = createAction('Offices Page] Load Offices Failed');
