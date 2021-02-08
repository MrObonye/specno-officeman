import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { ModalService , OfficemanService, Office, NotifyService } from '../../../shared';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss'],
})
export class OfficeComponent implements OnInit, OnDestroy {
  toggle1 = true;
  editOfficeForm: FormGroup;
  @Input() offices: Office[];
  officeName: string;
  id: string;
  subscription: Subscription;

  constructor(
    private router: Router,
    private modalService: ModalService,
    private readonly fb: FormBuilder,
    private officeMan: OfficemanService,
    private notify: NotifyService
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
  get f(): any {
    return this.editOfficeForm.controls;
  }
  changeType(num: number): void {

    if (num === 1) { this.toggle1 = !this.toggle1; }
  }
  openOffice(office: Office): void {
    this.router.navigate([`./office/${office.id}`]);
  }

  saveOffice(formValue: Office): void {

    if (this.id) {
      this.officeMan.updateOffice(this.id, formValue)
        .then(() => {
          this.notify.showSuccess('Office Updated Successfully!', 'Update Office');
          this.editOfficeForm.reset();
        })
        .catch(err => {
          this.notify.showError('Oops! Something went wrong on our side!', 'Office');
          console.log(err);

        });
    }
    this.closeModal('custom-modal-2');
  }
  removeOffice(): void {
    // this.officeMan.removeOffice(this.id);
    this.officeMan.deleteOffice(this.id).then(() => this.notify.showSuccess('Office deleted successfully!', 'Delete Office'));
    console.log(`remove this item from db ${this.id}`);
    this.modalService.close('custom-modal-3');

  }
  openModal(id: string, office: Office): void {
    // this.officeMan.broadcastOffice(office);
    this.id = office.key;
    this.f.officeName.setValue(office.officeName);
    this.f.email.setValue(office.email);
    this.f.address.setValue(office.address);
    this.f.maxOccupants.setValue(office.maxOccupants);
    this.f.officeColor.setValue(office.officeColor);
    this.f.officeTel.setValue(office.officeTel);
    this.modalService.open(id);
  }
  openModalDel(modalId: string, office: Office): void {
    this.id = modalId;
    this.officeName = office.officeName;
    this.id = office.key;
    this.modalService.open(modalId);
  }
  closeModal(id: string): void {
    this.modalService.close(id);
  }



  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
}
