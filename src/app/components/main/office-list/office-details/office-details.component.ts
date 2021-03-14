import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
// import { AppState } from 'src/app/app.state';
import * as fromOffices from './../../reducers/office.reducers';
import { Office } from 'src/app/shared';

import { OfficemanService } from '../../../../services/officeman/officeman.service';


@Component({
  selector: 'app-office-details',
  templateUrl: './office-details.component.html',
  styleUrls: ['./office-details.component.scss']
})
export class OfficeDetailsComponent implements OnInit, OnDestroy {

  offices$: Observable<Office[]>;
  office: Office;
  id: string;
  subs: Subscription;
  constructor(
    private officeMan: OfficemanService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromOffices.State>
  ) {
    this.id = route.snapshot.params.id;
  }

  ngOnInit(): void {
    const key = this.id;
    this.offices$ = this.store.pipe(select(theState => theState.offices));
    // tslint:disable-next-line: deprecation
    this.subs = this.offices$.subscribe(offices => {
      return offices.filter(office => {
        if (office.key === key) {
          this.office = office;
        }
      });
    });

    if (this.office === undefined) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
