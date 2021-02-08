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

  officesRef: AngularFireList<Office>;
  staffRef: AngularFireList<Staff>;

  constructor(public db: AngularFireDatabase) {
    this.officesRef = db.list<Office>('/offices');
    // this.staffRef = db.list<Staff>('/staff');
  }
  getAll(): Observable<Office[]> {
    return this.officesRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(offices => ({ key: offices.payload.key, ...offices.payload.val() }))));
  }
  createOffice(office: Office): any {
    office.id = this.getRandomString(24);
    return this.officesRef.push(office);
  }
  updateOffice(key: string, value: Office): any {
    return this.officesRef.update(key, value);
  }
  deleteOffice(key: string): any {
    return this.officesRef.remove(key);
  }

  /* CRUD FOR STAFF */

  getAllStaff(key: string): Observable<Staff[]> {
    this.staffRef = this.db.list(`/offices/${key}/staff`);
    return this.staffRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(staff => (({key: staff.payload.key, ...staff.payload.val()})))));
  }

  createStaff(staff: Staff): any {
    this.staffRef = this.db.list(`/offices/${staff.officeKey}/staff`);
    staff.id = this.getRandomString(24);
    return this.staffRef.push(staff);
  }
  updateStaff(key: string, value: Staff): any {
    return this.staffRef.update(key, value);
  }
  deleteStaff(key: string): any {
    return this.staffRef.remove(key).then().catch(err => console.error(err));
  }
  getRandomString(length): string {
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for ( let i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}


}
