import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private db: AngularFireDatabase) { }

  /* getStaff(start: any, end: any): AngularFireList<any> {
    return this.db.list('/staff', {
      query: {
        orderByChild: 'Firstname',
        limitToFirst: 10,
        startAt: start,
        endAt: end
      }
    });
  } */
  search() {
  }
}
