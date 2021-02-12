import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/app.state';
import { ModalService, OfficemanService, Office, updateOfficeRequest, deleteOfficeRequest, refreshOfficesRequest } from '../../../shared';

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
  count = [];
  id: string;
  @Input() staff: number;
  subscription: Subscription;

  constructor(
    private router: Router,
    private modalService: ModalService,
    private readonly fb: FormBuilder,
    private store: Store<AppState>,
    private OFMS: OfficemanService
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

    // This method it used to count the number of occupants
    this.store.dispatch(refreshOfficesRequest());
    const staff = this.store.pipe(select((theState) => theState.offices));
    this.count.length = 0;
    this.subscription = staff.subscribe(data => {
      data.forEach((item) => {
        let counter = 0;
        if (item.staff) {
          counter = Object.values(item.staff).length;
        } else {
          counter = 0;
        }
        this.count.push(counter);
      });

    });

  }
  get f(): any {
    return this.editOfficeForm.controls;
  }
  openOffice(office: Office): void {
    this.router.navigate([`./office/${office.key}`]);
  }

  saveOffice(office: Office): void {

    if (this.id) {
      office.key = this.id;
      this.store.dispatch(updateOfficeRequest({ office }));
    }
    this.editOfficeForm.reset();
    this.closeModal('custom-modal-2');
  }
  removeOffice(): void {
    const key = this.id;
    this.store.dispatch(deleteOfficeRequest({ key }));
    this.modalService.close('custom-modal-3');

  }
  openModal(id: string, office: Office): void {
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
  // to prevent memory leaks close the subscription
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

