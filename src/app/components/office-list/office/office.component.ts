import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router) {}

  ngOnInit(): void {}
  changeType( num: number): void {

    if (num === 1) { this.toggle1 = !this.toggle1; }
  }
  openOffice(): void {
    this.router.navigate(['./']);
  }
}
