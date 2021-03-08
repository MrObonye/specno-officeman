/*
A service that hosts all the CRUD functions which integrate with firebase
The service is interfaced by the Ngrx effects instead of components
which use the service.

*/
import { Injectable } from '@angular/core';
import { Office } from 'src/app/models/office.model';
import { Staff } from 'src/app/models/staff.model';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotifyService } from '../notify/notify.service';

@Injectable({
  providedIn: 'root'
})
export class OfficemanService {

  officesRef: AngularFireList<Office>;
  staffRef: AngularFireList<Staff>;

  constructor(public db: AngularFireDatabase, private notify: NotifyService) {
    this.officesRef = db.list<Office>('/offices');
  }
  // A function to retrieve all offices from firebase and return it as an Observable
  getAll(): Observable<Office[]> {
    return this.officesRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(offices => ({ key: offices.payload.key, ...offices.payload.val() }))));
  }

  /*  A function to create an office and returns a message on successful request
   or an error message on failure
   */
  createOffice(office: Office): any {
    return this.officesRef.push(office)
      .then(() => this.notify.showSuccess('Office Added Successfully!!!', 'ADD OFFICE'))
      .catch(() => this.notify.showError('Oops!! Something went wrong on our side', 'UPDATE OFFICE'));
  }
  getOffice(key: string): Observable<Office> {
    return this.db.object<Office>(`/offices/${key}`).valueChanges();
  }
  updateOffice(office: Office): any {
    return this.officesRef
      .update(office.key, office).then(() => this.notify.showSuccess('Office Updated Sucessfully!', 'UPDATE OFFICE'))
      .catch(() => this.notify.showError('Oops!! Something went wrong on our side', 'UPDATE OFFICE'));
  }
  deleteOffice(key: string): any {
    return this.officesRef.remove(key)
      .then(() => this.notify.showSuccess('Office Deleted Successfully!!', 'DELETE OFFICE'))
      .catch(() => this.notify.showError('Oops!! Something went wrong on our side', 'UPDATE OFFICE'));
  }

  /* CRUD FOR STAFF */

  getAllStaff(key: string): Observable<Staff[]> {
    this.staffRef = this.db.list<Staff>(`/offices/${key}/staff`);
    return this.staffRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(staff => (({ key: staff.payload.key, ...staff.payload.val() })))));
  }

  createStaff(staff: Staff): any {
    this.staffRef = this.db.list(`/offices/${staff.officeKey}/staff`);
    return this.staffRef.push(staff)
      .then(() => this.notify.showSuccess('Staff member added Sucessfully!', 'ADD STAFF'));
  }
  updateStaff(staff: Staff): any {
    this.staffRef = this.db.list(`/offices/${staff.officeKey}/staff`);
    return this.staffRef.
      update(staff.key, staff)
      .then(() => this.notify.showSuccess('Staff member updated successfully', 'UPDATE STAFF'));
  }
  deleteStaff(staff: Staff): any {
    this.staffRef = this.db.list(`/offices/${staff.officeKey}/staff`);
    return this.staffRef
      .remove(staff.key)
      .then(() => this.notify.showSuccess('Sucessfully deleted Staff', 'DELETE STAFF'))
      .catch(err => console.error(err));
  }

  // a function to generate a 24 character alphanumeric id
  getRandomString(length: number): string {
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }


}
