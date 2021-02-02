import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEllipsisV, faPhoneAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from '../../services/modal.service';

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
  constructor(private router: Router, private modalService: ModalService) { }

  ngOnInit(): void { }
  changeType(num: number): void {
    if (num === 1) { this.toggle1 = !this.toggle1; }
  }
  openOffice(id: number): void {
    console.log('open office details');
    this.router.navigate([`./office/${id}`]);
  }

  saveOffice(): void {
    console.log('saving office at office-item');
  }
  openModal(id: string, num: number): void {
    console.log(id);
    this.modalService.open(id);
    if (num === 1) { this.toggle1 = !this.toggle1; }
  }
  closeModal(id: string, num: number): void {
    console.log(id);
    this.modalService.close(id);
    if (num === 1) { this.toggle1 = !this.toggle1; }
  }
}
