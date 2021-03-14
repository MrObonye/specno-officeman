import { createAction, props } from '@ngrx/store';
import { Staff } from 'src/app/models';

export const refreshStaffMembersRequest = createAction('[Staff] Refresh Staff Request', props<{key: string}>());
export const refreshStaffMembersDone = createAction('[Staff] Refresh Staffs Done', props<{staffMembers: Staff[]}>());
export const getStaffRequest = createAction('[Staff] Get Staff Request', props<{key: string}>());
export const getStaffDone = createAction('[Staff] Get Staff Request Done', props<{staffMember: Staff}>());
export const addStaffRequest = createAction('[Staff] Add Staff Request', props<{staffMember: Staff}>());
export const updateStaffRequest = createAction('[Staff] Update Staff Request', props<{staffMember: Staff}>());
export const deleteStaffRequest = createAction('[Staff] Delete Staff Request', props<{staffMember: Staff}>());
