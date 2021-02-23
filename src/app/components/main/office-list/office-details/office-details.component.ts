import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { getOfficeRequest, Office } from 'src/app/shared';

import { OfficemanService } from '../../../../shared/services/officeman/officeman.service';

@Component({
  selector: 'app-office-details',
  templateUrl: './office-details.component.html',
  styleUrls: ['./office-details.component.scss']
})
export class OfficeDetailsComponent implements OnInit {

  office$: Observable<Office> = this.store.pipe(select(theState => theState.office));
  // office: Office;
  id: string;
  constructor(
    private officeMan: OfficemanService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>) {
    this.id = route.snapshot.params.id;
  }

  ngOnInit(): void {
    const key = this.id;
    this.store.dispatch(getOfficeRequest({key}));
  }

}
