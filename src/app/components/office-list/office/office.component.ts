import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { ModalService , OfficemanService, Office, NotifyService, updateOfficeRequest, deleteOfficeRequest } from '../../../shared';

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
  subscription: Subscription;

  constructor(
    private router: Router,
    private modalService: ModalService,
    private readonly fb: FormBuilder,
    private officeMan: OfficemanService,
    private notify: NotifyService,
    private store: Store<{offices: Office[]}>
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
    this.router.navigate([`./office/${office.key}`]);
  }

  saveOffice(office: Office): void {

    if (this.id) {
      office.key = this.id;
      this.store.dispatch(updateOfficeRequest({office}));
    }
    this.editOfficeForm.reset();
    this.closeModal('custom-modal-2');
  }
  removeOffice(): void {
    const key = this.id;
    // this.officeMan.removeOffice(this.id);
    // this.officeMan.deleteOffice(this.id).then(() => this.notify.showSuccess('Office deleted successfully!', 'Delete Office'));
    this.store.dispatch(deleteOfficeRequest({key}));
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
}
