import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Office } from 'src/app/models/office.model';
import { Offices } from 'src/app/temp-data/db';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss'],
})
export class OfficeComponent implements OnInit {
  toggle1 = true;
  editOfficeForm: FormGroup;
  @Input() offices: Office[];
  constructor(private router: Router, private modalService: ModalService, private readonly fb: FormBuilder) {
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
  get f() {
    return this.editOfficeForm.controls;
  }
  changeType(): void {
    this.toggle1 = !this.toggle1;
  }
  openOffice(id: number): void {
    console.log('open office details');
    this.router.navigate([`./office/${id}`]);
  }

  saveOffice(formValues: Office): void {
    console.log(formValues);
  }
  removeOffice(id: string): void {
    console.log(`remove this item from db ${id}`);
  }
  openModal(id: string): void {
    this.toggle1 = !this.toggle1;
    this.modalService.open(id);
  }
  closeModal(id: string): void {
    this.toggle1 = !this.toggle1;
    this.modalService.close(id);
  }
}
