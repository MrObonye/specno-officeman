import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import {
  Office, OfficemanService, ModalService,
  NotifyService, GetAllOffices, getCreatorError,
  getDeleteError, isDeleted, isUpdated
} from 'src/app/shared';

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.scss']
})
export class OfficeListComponent implements OnInit, OnDestroy {
  addOfficeForm: FormGroup;
  officesOutput: Office[];
  editMode = false;
  subscription: Subscription;

  constructor(
    private modalService: ModalService,
    private readonly fb: FormBuilder,
    private officeManService: OfficemanService,
    private notify: NotifyService,
    private store: Store<AppState>
  ) {
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

    this.subscription = this.officeManService.getAll().subscribe((offices: Office[]) => {
      this.officesOutput = offices;
    });

  }
  get f(): any {
    return this.addOfficeForm.controls;
  }
  openModal(id: string): void {
    this.modalService.open(id);
  }
  closeModal(id: string): void {
    this.modalService.close(id);
  }

  // method to save office
  saveOffice(formValue: Office): void {
    this.officeManService.createOffice(formValue)
      .then(() => {
        this.notify.showSuccess('Office Added Successfully!', 'Add Office');
        this.closeModal('custom-modal-1');
        this.addOfficeForm.reset();
      })
      .catch(err => {
        this.notify.showError('Oops! Something went wrong on our side!', 'Office');
        console.error(err);
      }
      );
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.editMode = false;
  }

}
