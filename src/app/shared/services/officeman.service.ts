import { Injectable } from '@angular/core';
import { Office } from 'src/app/shared/models/office.model';
import { Staff } from 'src/app/shared/models/staff.model';

import { AngularFireDatabase} from '@angular/fire/database';
import {AngularFireList } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfficemanService {
  // offices: AngularFireList<Office[]>
  data = [];
  staffData = [];
  office = new BehaviorSubject<Office>(new Office());
  office$ = this.office.asObservable();
  officesRef: AngularFireList<Office>;

  constructor(public db: AngularFireDatabase) {
    this.officesRef = db.list<Office>('/offices');
    /* db.list('/offices').snapshotChanges().subscribe(res => res.forEach( item => {
      const office = item.payload.toJSON();
      office['id'] = item.key;
      this.data.push(office as Office);
    })); */
  }
  getAll(): AngularFireList<Office> {
    return this.officesRef;
  }
  create(office: Office): any{
    return this.officesRef.push(office);
  }
  /* public addOffice(office: Office): void {
    this.db.object('offices').set(office);
    console.log(office);

  }
  public removeOffice(id: string): void {
    console.log(id);

  }
 public addStaff(staff: Staff): void {
    this.db.list('/staff').push(staff);

  }
  public removeStaff(staff: Staff): void {
    console.log(staff);

  }
  public retrieveOffices(): Office[] {
    return this.data;
  }
  retrieveStaff(): Staff[] {
    return this.staffData;

  }
  broadcastOffice(office: Office): void {
    this.office.next(office);
  } */

}
