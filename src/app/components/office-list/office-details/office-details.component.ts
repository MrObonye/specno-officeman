import { Component, OnInit, OnDestroy } from '@angular/core';

import { Office } from 'src/app/shared/models/office.model';
import { OfficemanService } from '../../../shared/services/officeman.service';

@Component({
  selector: 'app-office-details',
  templateUrl: './office-details.component.html',
  styleUrls: ['./office-details.component.scss']
})
export class OfficeDetailsComponent implements OnInit {

  office: Office;
  constructor(private officeMan: OfficemanService) { }

  ngOnInit(): void {
    this.officeMan.office$.subscribe(item => {
      this.office = new Office();
      this.office = item;
      console.log(this.office);
    });
  }

}
