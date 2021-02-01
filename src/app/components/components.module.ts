import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { faEllipsisV, faPhoneAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { OfficeComponent } from './office-list/office/office.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { RouterModule } from '@angular/router';
import { OfficeListComponent } from './office-list/office-list.component';
import { StaffEditComponent } from './staff-list/staff-edit/staff-edit.component';
import { OfficeEditComponent } from './office-list/office-edit/office-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from './modal/modal.module';



@NgModule({
  declarations: [OfficeComponent, OfficeListComponent, StaffEditComponent, OfficeEditComponent],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FontAwesomeModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    ModalModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {
  constructor() {
    library.add(faPhoneAlt, faEllipsisV, faUserFriends);
  }
}
