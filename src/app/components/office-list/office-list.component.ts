import { Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/app.state';
import {
  Office, OfficemanService, ModalService, refreshOfficesRequest, addOfficeRequest
} from 'src/app/shared';

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.scss']
})
export class OfficeListComponent implements OnInit {
  addOfficeForm: FormGroup;
  officesOutput$ = this.store.pipe(select(theState => theState.offices));
  count = [];

  constructor(
    private modalService: ModalService,
    private readonly fb: FormBuilder,
    private officeManService: OfficemanService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    /* Generate a reactive form */
    this.addOfficeForm = this.fb.group({
      officeName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      officeTel: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      maxOccupants: new FormControl('', Validators.required),
      officeColor: new FormControl('')
    });

    // Dispatch an action to retrieve office from NgRx store
    this.store.dispatch(refreshOfficesRequest());

  }
  get f(): any {
    return this.addOfficeForm.controls;
  }
  openModal(id: string): void {
    this.addOfficeForm.reset();
    this.modalService.open(id);
  }
  closeModal(id: string): void {
    this.modalService.close(id);
  }

  // method to save office
  saveOffice(office: Office): void {
    if (this.addOfficeForm.valid) {
      office.id = this.officeManService.getRandomString(24);
      this.count = [];
      this.store.dispatch(addOfficeRequest({ office }));
      this.closeModal('custom-modal-1');
      this.addOfficeForm.reset();
    }
  }

}
