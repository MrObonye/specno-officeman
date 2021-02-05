import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Office } from 'src/app/shared/models/office.model';
import { ModalService } from '../../shared/services/modal.service';
import { OfficemanService } from '../../shared/services/officeman.service';

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
    private toastr: ToastrService) {
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
      this.officesOutput  = offices;
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
        this.showSuccess();
        this.closeModal('custom-modal-1');
        this.addOfficeForm.reset();
      })
      .catch(err => {
        this.showError();
        console.error(err);
      }
      );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.editMode = false;
  }

  // Toast messages

  showSuccess(): void {
    this.toastr.success('Office Added Successfully!', 'Add Office');
  }
  showError(): void {
    this.toastr.error('Oops! Something went wrong on our side!', 'Office');
  }

}
