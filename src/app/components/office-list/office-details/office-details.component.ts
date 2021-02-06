import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared';

import { Office } from 'src/app/shared/models/office.model';
import { OfficemanService } from '../../../shared/services/officeman.service';

@Component({
  selector: 'app-office-details',
  templateUrl: './office-details.component.html',
  styleUrls: ['./office-details.component.scss']
})
export class OfficeDetailsComponent implements OnInit, OnDestroy {

  officeData: Office[];
  office: Office;
  id: string;
  subscription: Subscription;
  constructor(private officeMan: OfficemanService, private route: ActivatedRoute, private router: Router, private uiService: UiService) {
    this.id = route.snapshot.params.id;
  }

  ngOnInit(): void {
    if (!this.office === null) {
      this.office = this.officeMan.office;
    }
    this.subscription = this.officeMan.getAll().subscribe((item: Office[]) => {
      this.officeData = item;
      this.officeData.forEach((office: Office) => office.id === this.id ? this.office = office : null ); });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
