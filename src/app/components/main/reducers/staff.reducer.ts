import { createReducer, on } from '@ngrx/store';
import { Staff } from 'src/app/models';
import { refreshStaffMembersDone } from 'src/app/store';

export interface State {
  staff: Staff[];
}
export const staffMembersReducer = createReducer<Staff[]>([],
  on(refreshStaffMembersDone, (_, action) => action.staffMembers));
