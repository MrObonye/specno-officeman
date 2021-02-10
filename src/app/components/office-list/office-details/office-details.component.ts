import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { getOfficeRequest } from 'src/app/shared';

import { Office } from 'src/app/shared/models/office.model';
import { OfficemanService } from '../../../shared/services/officeman.service';

@Component({
  selector: 'app-office-details',
  templateUrl: './office-details.component.html',
  styleUrls: ['./office-details.component.scss']
})
export class OfficeDetailsComponent implements OnInit {

  office$ = this.store.pipe(select(theState => theState.office));
  // office: Office;
  id: string;
  constructor(
    private officeMan: OfficemanService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{office: Office}>) {
    this.id = route.snapshot.params.id;
  }

  ngOnInit(): void {
    const key = this.id;
    this.store.dispatch(getOfficeRequest({key}));
  }

}
