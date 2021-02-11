import { state } from '@angular/animations';
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/app.state';
import {
  Office, OfficemanService, ModalService,
  NotifyService, refreshOfficesRequest, addOfficeRequest
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
    this.addOfficeForm = this.fb.group({
      officeName: new FormControl(''),
      email: new FormControl(''),
      officeTel: new FormControl(''),
      address: new FormControl(''),
      maxOccupants: new FormControl(''),
      officeColor: new FormControl('')
    });

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
