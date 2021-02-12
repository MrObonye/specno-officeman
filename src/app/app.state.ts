import { Office, Staff } from './shared';


export interface AppState {
    offices: Office[];
    office: Office;
    staffMembers: Staff[];
    staffMember: Staff;
}
