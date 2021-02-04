import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Office } from 'src/app/shared/models/office.model';
import { ModalService } from '../../../shared/services/modal.service';
import { OfficemanService } from '../../../shared/services/officeman.service';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss'],
})
export class OfficeComponent implements OnInit {
  toggle1 = true;
  editOfficeForm: FormGroup;
  @Input() offices: Office[];
  officeName: string;
  id: string;
  constructor(
    private router: Router,
    private modalService: ModalService,
    private readonly fb: FormBuilder,
    private officeMan: OfficemanService
  ) {
  }

  ngOnInit(): void {
    this.editOfficeForm = this.fb.group({
      officeName: new FormControl(''),
      email: new FormControl(''),
      officeTel: new FormControl(''),
      address: new FormControl(''),
      maxOccupants: new FormControl(''),
      officeColor: new FormControl('')
    });
  }
  get f() {
    return this.editOfficeForm.controls;
  }
  changeType(num: number): void {

    if (num === 1) { this.toggle1 = !this.toggle1; }
  }
  openOffice(office: Office): void {

   /*  this.officeMan.broadcastOffice(office);
    this.router.navigate([`./office/${office.officeName}`]); */
  }

  saveOffice(formValues: Office): void {
    // this.officeMan.editOffice(formValues);
  }
  removeOffice(): void {
    // this.officeMan.removeOffice(this.id);
    console.log(`remove this item from db ${this.id}`);
  }
  openModal(id: string, office: Office): void {
    console.log(office);
    // this.officeMan.broadcastOffice(office);
    this.f.officeName.setValue(office.officeName);
    this.f.email.setValue(office.email);
    this.f.address.setValue(office.address);
    this.f.maxOccupants.setValue(office.maxOccupants);
    this.f.officeColor.setValue(office.officeColor);
    this.f.officeTel.setValue(office.officeTel);
    this.modalService.open(id);
  }
  openModalDel(modalId: string, officeId: string, officeName: string): void {
    this.id = modalId;
    this.officeName = officeName;
    this.id = officeId;
    this.modalService.open(modalId);
  }
  closeModal(id: string): void {
    this.modalService.close(id);
  }
}
