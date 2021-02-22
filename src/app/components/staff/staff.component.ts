import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Staff } from 'src/app/shared/models/staff.model';
import { Subject, Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/shared/services/modal.service';
import { OfficemanService } from 'src/app/shared/services/officeman/officeman.service';
import { Office } from 'src/app/shared/models/office.model';
import { addStaffRequest, deleteStaffRequest, NotifyService, refreshStaffMembersRequest, updateStaffRequest } from 'src/app/shared';
import { AppState } from 'src/app/app.state';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit, OnDestroy {
  staffMembers: Staff[];
  buffer: Staff[];
  startAt = new Subject();
  endAt = new Subject();
  lastKeypress = 0;
  toggle1 = true;
  staffForm: FormGroup;
  staffName: string;
  staff: Staff;
  filteredData = this.store.pipe(select(theState => theState.staffMembers));
  id: string;
  @Input() office: Office = null;
  sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private officeManService: OfficemanService,
    private notify: NotifyService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.id = route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.staffForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required)
    });
    this.sub = this.filteredData.subscribe(data => this.staffMembers = this.buffer = data);

    this.store.dispatch(refreshStaffMembersRequest({ key: this.id }));


  }
  get f(): any {
    return this.staffForm.controls;
  }

  search($event): void {
    const q = $event.target.value;
    const result = this.buffer.filter(
      item => {
        // const value: string;
        return item.firstName.toLowerCase().includes(q.toLowerCase().trim()) ||
          item.lastName.toLocaleLowerCase().includes(q.toLowerCase().trim());
      });

    this.staffMembers = result;
  }
  // TODO fix types for staff
  openModal(id: string): void {
    this.staffForm.reset();
    this.modalService.open(id);
  }
  openModalEdit(id: string, staff: Staff): void {
    this.populateForm(staff);
    this.modalService.open(id);
  }
  openModalDel(id: string, staff: Staff): void {
    if (staff.key) {
      this.staffName = `${staff.firstName} ${staff.lastName}`;
      this.staff = staff;
      this.modalService.open(id);
    }

  }
  changeType(num: number): void {

    if (num === 1) { this.toggle1 = !this.toggle1; }
  }
  closeModal(id: string): void {
    this.modalService.close(id);
  }
  saveStaff(staffMember: Staff): void {
    if (!this.staffForm.valid) {
      return;
    }
    if (this.staffMembers.length < this.office.maxOccupants) {

      if (this.office) {
        staffMember.officeId = this.office.id;
        staffMember.officeKey = this.id;
        staffMember.id = this.officeManService.getRandomString(24);
        this.store.dispatch(addStaffRequest({ staffMember }));
      } else {
        this.notify.showError('Oops! Something wrong on our side!!!', 'Add Staff');
      }
    } else {
      this.notify.showError('Oops! We have reached maximum capacity', 'Add Staff');
    }

    this.staffForm.reset();
    this.modalService.close('custom-modal-1');
  }
  updateStaff(staffMember: Staff): void {
    staffMember.id = this.staff.id;
    staffMember.officeKey = this.staff.officeKey;
    staffMember.officeId = this.staff.officeId;
    staffMember.key = this.staff.key;

    this.store.dispatch(updateStaffRequest({ staffMember }));
    this.staffForm.reset();
    this.modalService.close('custom-modal-2');
  }
  removeStaff(): void {
    if (this.staff) {
      const staffMember = this.staff;
      this.store.dispatch(deleteStaffRequest({ staffMember }));
    }
    this.modalService.close('custom-modal-3');
  }

  populateForm(staff: Staff): void {
    this.staff = staff;
    this.f.firstName.setValue(staff.firstName);
    this.f.lastName.setValue(staff.lastName);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
