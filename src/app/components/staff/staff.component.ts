import { Component, OnInit } from '@angular/core';
import { Staff } from 'src/app/models/staff.model';
import { Subject } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { OfficemanService } from 'src/app/services/officeman.service';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  staffMembers: Staff[];
  startAt = new Subject();
  endAt = new Subject();
  lastKeypress = 0;
  toggle1 = true;
  staffForm: FormGroup;
  staffName: string;
  filteredData: Staff[];

  constructor(
    private searchService: SearchService,
    private fb: FormBuilder,
    private modalService: ModalService,
    private officeManService: OfficemanService
  ) { }

  ngOnInit(): void {
    /*  this.searchService.getStaff(this.startAt, this.endAt).subscribe(staff => {
       this.staffMembers = staff;
     }); */
    this.staffForm = this.fb.group({
      firstName: new FormControl(''),
      lastName: new FormControl('')
    });

    if ( this.staffMembers === undefined) {
      this.staffMembers = this.officeManService.retrieveStaff();
    }
    this.filteredData = this.staffMembers;
  }
  get f() {
    return this.staffForm.controls;
  }
  submit(formValues: string) {
    console.log(formValues);
  }
  search($event): void {
    const q = $event.target.value;
    const result = this.staffMembers.filter(
      item => {
        // const value: string;
        return item.firstName.toLowerCase().includes(q.toLowerCase().trim())  ||
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
    console.log(staff);
  }
  openModalDel(id: string, staff: Staff): void {
    this.officeManService.removeStaff(staff);
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
    this.officeManService.addStaff(formValue);
  }
  removeStaff(): void { }

  populateForm(staff: Staff): void {
    this.f.firstName.setValue(staff.firstName);
    this.f.lastName.setValue(staff.lastName);
  }

}
