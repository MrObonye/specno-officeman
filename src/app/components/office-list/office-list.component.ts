import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
      officeName: new FormControl(''),
      email: new FormControl(''),
      officeTel: new FormControl(''),
      address: new FormControl(''),
      maxOccupants: new FormControl(''),
      officeColor: new FormControl('')
    });

    // Dispatch an action to retrieve office from NgRx store
    this.store.dispatch(refreshOfficesRequest());

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
  saveOffice(office: Office): void {
    office.id = this.officeManService.getRandomString(24);
    this.store.dispatch(addOfficeRequest({ office }));
    this.closeModal('custom-modal-1');
    this.addOfficeForm.reset();
  }

}
