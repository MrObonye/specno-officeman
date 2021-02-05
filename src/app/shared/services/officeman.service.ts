import { Injectable } from '@angular/core';
import { Office } from 'src/app/shared/models/office.model';
import { Staff } from 'src/app/shared/models/staff.model';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfficemanService {
  // offices: AngularFireList<Office[]>
  data = [];
  staffData = [];
  office: Office;
  // office$ = this.office.asObservable();
  officesRef: AngularFireList<Office>;
  staffRef: AngularFireList<Staff>;

  constructor(public db: AngularFireDatabase) {
    this.officesRef = db.list<Office>('/offices');
    this.staffRef = db.list<Staff>('/staff');
  }
  getAll(): Observable<Office[]> {
    return this.officesRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(offices => ({ id: offices.payload.key, ...offices.payload.val() }))));
  }
  createOffice(office: Office): any {
    return this.officesRef.push(office);
  }
  updateOffice(key: string, value: Office): any {
    return this.officesRef.update(key, value);
  }
  deleteOffice(key: string): any {
    return this.officesRef.remove(key);
  }

  /* CRUD FOR STAFF */

  getAllStaff(): Observable<Staff[]> {
    return this.staffRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(staff => (({id: staff.payload.key, ...staff.payload.val()})))));
  }

  createStaff(staff: Staff): any {
    return this.staffRef.push(staff);
  }
  updateStaff(key: string, value: Staff): any {
    return this.staffRef.update(key, value);
  }
  deleteStaff(key: string): any {
    console.log(`delete staff: ${key}`);
    return this.staffRef.remove(key).then().catch(err => console.error(err));
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

  }*/

 /*  broadcastOffice(office: Office): void {
    this.office.next(office);
  } */

}
