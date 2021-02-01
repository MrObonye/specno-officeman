import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { OfficeEditComponent } from './office-details/office-details.component';

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.scss']
})
export class OfficeListComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }
  openModal(id: string): void {
    this.modalService.open(id);
}
  closeModal(id: string): void {
    this.modalService.close(id);
}
saveOffice(): void {
  console.log('saved the form!');
  
}
}
