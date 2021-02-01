import { Component, OnInit } from '@angular/core';
import { OfficeEditComponent } from './office-edit/office-edit.component';

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.scss']
})
export class OfficeListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
