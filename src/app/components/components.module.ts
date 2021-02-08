import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { faEllipsisV, faPhoneAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { OfficeComponent } from './office-list/office/office.component';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import {EffectsModule} from '@ngrx/effects';
import * as officeReducer from './../shared';

import { ComponentsRoutingModule } from './components-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { RouterModule } from '@angular/router';
import { OfficeListComponent } from './office-list/office-list.component';
import {OfficeDetailsComponent} from './office-list/office-details/office-details.component';


import {  ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent, ModalModule , OfficeEffects } from '../shared';
import { StaffComponent } from './staff/staff.component';
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [OfficeComponent, OfficeListComponent, OfficeDetailsComponent, StaffComponent, LoadingComponent],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FontAwesomeModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forRoot({offices: officeReducer.reducer}),
    EffectsModule.forRoot([OfficeEffects]),
    NgbModule,
    ModalModule],
})
export class ComponentsModule {
  constructor() {
    library.add(faPhoneAlt, faEllipsisV, faUserFriends);
  }
}
