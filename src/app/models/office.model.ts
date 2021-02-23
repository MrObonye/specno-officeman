import { Staff } from "./staff.model";

export class Office {
  id: string;
  officeName: string;
  address: string;
  email: string;
  officeTel: string;
  maxOccupants: number;
  officeColor: string;
  staff: [];
  key: string;
}
