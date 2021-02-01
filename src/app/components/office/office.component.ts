import { Component, OnInit } from '@angular/core';
import { faEllipsisV, faPhoneAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss'],
})
export class OfficeComponent implements OnInit {
  faCoffee = faUserFriends;
  faEllipsisV = faEllipsisV;
  faPhone = faPhoneAlt;
  toggle1 = false;
  constructor() {}

  ngOnInit(): void {}
  changeType( num: number) {

    if (num === 1) { this.toggle1 = !this.toggle1; }
  }
}
