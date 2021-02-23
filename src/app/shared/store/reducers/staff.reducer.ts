import { createReducer, on } from '@ngrx/store';
import { Staff } from '../../../models';
import { refreshStaffMembersDone } from '../actions/staff.actions';


export const staffMembersReducer = createReducer<Staff[]>([],
    on(refreshStaffMembersDone, (_, action) => action.staffMembers));
