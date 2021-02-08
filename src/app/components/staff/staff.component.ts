import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Staff } from 'src/app/shared/models/staff.model';
import { Subject, Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/shared/services/modal.service';
import { OfficemanService } from 'src/app/shared/services/officeman.service';
import { Office } from 'src/app/shared/models/office.model';
import { NotifyService } from 'src/app/shared';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit, OnDestroy {
  staffMembers: Staff[];
  startAt = new Subject();
  endAt = new Subject();
  lastKeypress = 0;
  toggle1 = true;
  staffForm: FormGroup;
  staffName: string;
  staffId: string;
  filteredData: Staff[] = [];
  subscription: Subscription;
  @Input() office: Office = null;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private officeManService: OfficemanService,
    private notify: NotifyService
  ) { }

  ngOnInit(): void {
    this.staffForm = this.fb.group({
      firstName: new FormControl(''),
      lastName: new FormControl('')
    });
    this.subscription = this.officeManService.getAllStaff(this.office.key).subscribe((items: Staff[]) => {
      this.staffMembers = items.filter(staff => staff.officeId === this.office.id);
      this.filteredData = items.filter(staff => staff.officeId === this.office.id);

    });

    if (!this.staffMembers === undefined) {
      this.filteredData = this.staffMembers;

    }
  }
  get f(): any {
    return this.staffForm.controls;
  }

  search($event): void {
    const q = $event.target.value;
    const result = this.staffMembers.filter(
      item => {
        // const value: string;
        return item.firstName.toLowerCase().includes(q.toLowerCase().trim()) ||
          item.lastName.toLocaleLowerCase().includes(q.toLowerCase().trim());
      });

    this.filteredData = result;
  }
  // TODO fix types for staff
  openModal(id: string): void {
    this.modalService.open(id);
  }
  openModalEdit(id: string, staff: Staff): void {
    this.populateForm(staff);
    this.modalService.open(id);
  }
  openModalDel(id: string, staff: Staff): void {
    if (this.staffId === undefined) {
      this.staffId = staff.key;
    }
    this.staffName = `${staff.firstName} ${staff.lastName}`;
    this.modalService.open(id);

  }
  changeType(num: number): void {

    if (num === 1) { this.toggle1 = !this.toggle1; }
  }
  closeModal(id: string): void {
    this.modalService.close(id);
  }
  saveStaff(formValue: Staff): void {
    if (this.staffMembers.length < this.office.maxOccupants) {
      if (this.office.id) {
        formValue.officeId = this.office.id;
        formValue.officeKey = this.office.key;
        this.officeManService.createStaff(formValue)
          .then(() => this.notify.showSuccess('Office Updated Successfully!', 'Update Office'))
          .catch(() => this.notify.showError('Oops! Something went wrong on our side!', 'Office'));
      }
    }
    this.modalService.close('custom-modal-1');
  }
  updateStaff(formValue: Staff): void {
    this.officeManService.updateStaff(this.staffId, formValue);
    this.modalService.close('custom-modal-2');
  }
  removeStaff(): void {
    this.officeManService.deleteStaff(this.staffId).then(() => {
      this.staffId = undefined;
      this.notify.showSuccess('Office deleted successfully!', 'Delete Office');
    }).catch(err => console.log(err));
    this.modalService.close('custom-modal-3');
  }

  populateForm(staff: Staff): void {
    this.staffId = staff.id;
    this.f.firstName.setValue(staff.firstName);
    this.f.lastName.setValue(staff.lastName);
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
