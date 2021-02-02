import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Office } from 'src/app/models/office.model';
import { ModalService } from '../services/modal.service';
import { OfficemanService } from '../services/officeman.service';

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.scss']
})
export class OfficeListComponent implements OnInit {
  addOfficeForm: FormGroup;
  officesOutput: Office[];

  constructor(private modalService: ModalService, private readonly fb: FormBuilder, private officeManService: OfficemanService) {
   }

  ngOnInit(): void {
    this.addOfficeForm = this.fb.group({
      officeName: new FormControl(''),
      email: new FormControl(''),
      officeTel: new FormControl(''),
      address: new FormControl(''),
      maxOccupants: new FormControl(''),
      officeColor: new FormControl('')
    });
    if(this.officesOutput) {
      this.officesOutput = [];
    }
    this.officesOutput = this.officeManService.retrieveOffices();
  }
  get f() {
    return this.addOfficeForm.controls;
  }
  openModal(id: string): void {
    this.modalService.open(id);
  }
  closeModal(id: string): void {
    this.modalService.close(id);
  }
  saveOffice(formValue: Office): void {
    this.officeManService.addOffice(formValue);
  }
}
