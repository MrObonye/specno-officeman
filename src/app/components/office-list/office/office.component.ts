import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Office } from 'src/app/shared/models/office.model';
import { ModalService } from '../../../shared/services/modal.service';
import { OfficemanService } from '../../../shared/services/officeman.service';

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
    private toastr: ToastrService
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

    this.officeMan.office = office;
    this.router.navigate([`./office/${office.id}`]);
  }

  saveOffice(formValue: Office): void {

    if (this.id) {
      this.officeMan.updateOffice(this.id, formValue)
        .then(() => {
          this.showSuccess();
          this.editOfficeForm.reset();
        })
        .catch(err => {
          this.showError();
          console.log(err);

        });
    }
    this.closeModal('custom-modal-2');
  }
  removeOffice(): void {
    // this.officeMan.removeOffice(this.id);
    this.officeMan.deleteOffice(this.id).then(() => this.showSuccess());
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

  // Toast messages

  showSuccess(): void {
    this.toastr.success('Office Updated Successfully!', 'Update Office');
  }
  delSuccess(): void {
    this.toastr.success('Office deleted successfully!', 'Delete Office');
  }
  showError(): void {
    this.toastr.error('Oops! Something went wrong on our side!', 'Office');
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
}
