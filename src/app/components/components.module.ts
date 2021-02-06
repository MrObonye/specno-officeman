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
import {OfficeDetailsComponent} from './office-list/office-details/office-details.component';


import {  ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent, ModalModule, UiService } from '../shared';
import { StaffComponent } from './staff/staff.component';



@NgModule({
  declarations: [OfficeComponent, OfficeListComponent, OfficeDetailsComponent, StaffComponent, LoadingComponent],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FontAwesomeModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    ModalModule],
})
export class ComponentsModule {
  constructor() {
    library.add(faPhoneAlt, faEllipsisV, faUserFriends);
  }
}
