import { Injectable } from '@angular/core';
import { Office } from 'src/app/models/office.model';
import { Staff } from 'src/app/models/staff.model';

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
  private office = new BehaviorSubject<Office>(new Office());
  office$ = this.office.asObservable();

  constructor(public db: AngularFireDatabase) {
    db.list('/offices').snapshotChanges().subscribe(res => res.forEach( item => {
      const office = item.payload.toJSON();
      office['id'] = item.key;
      this.data.push(office as Office);
    }));
  }
  public editOffice(office: Office): void {
    console.log(office);

  }
  public addOffice(office: Office): void {
    this.db.list('offices').push(office);
    console.log(office);

  }
  public removeOffice(id: string): void {
    console.log(id);

  }
 public addStaff(staff: Staff): void {
    console.log(staff);

  }
  public removeStaff(staff: Staff): void {
    console.log(staff);

  }
  public retrieveOffices(): Office[] {
    return this.data;
  }
  broadcastOffice(office: Office): void {
    this.office.next(office);
  }
}
