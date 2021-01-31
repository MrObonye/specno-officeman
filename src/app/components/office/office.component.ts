import { Component, OnInit } from '@angular/core';
import { faCoffee, faEllipsisV, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss'],
})
export class OfficeComponent implements OnInit {
  faCoffee = faCoffee;
  faEllipsisV = faEllipsisV;
  faPhone = faPhoneAlt;
  constructor() {}

  ngOnInit(): void {}
}
