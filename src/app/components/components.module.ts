import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { faEllipsisV, faPhoneAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { OfficeComponent } from './office-list/office/office.component';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CommonModule } from '@angular/common';

import {EffectsModule} from '@ngrx/effects';
import { officeReducer, officesReducer, StaffEffects, staffMembersReducer } from './../shared';

import { ComponentsRoutingModule } from './components-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { RouterModule } from '@angular/router';
import { OfficeListComponent } from './office-list/office-list.component';
import {OfficeDetailsComponent} from './office-list/office-details/office-details.component';
import {OfficeEffects} from './../shared/store/effects/office.effects';


import {  ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent, ModalModule } from '../shared';
import { StaffComponent } from './staff/staff.component';
import { StoreModule } from '@ngrx/store';
import { NgInitDirective } from '../shared/directives/nginit.directive';



@NgModule({
  declarations: [OfficeComponent, OfficeListComponent, OfficeDetailsComponent, StaffComponent, LoadingComponent, NgInitDirective],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FontAwesomeModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ offices: officesReducer, office: officeReducer, staffMembers: staffMembersReducer }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([ OfficeEffects, StaffEffects ]),
    NgbModule,
    ModalModule],
})
export class ComponentsModule {
  constructor() {
    library.add(faPhoneAlt, faEllipsisV, faUserFriends);
  }
}
