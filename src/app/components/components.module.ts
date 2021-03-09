import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OfficeComponent } from './main/office-list/office/office.component';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CommonModule } from '@angular/common';

import {EffectsModule} from '@ngrx/effects';
// import { officeReducer, officesReducer, StaffEffects, staffMembersReducer } from './../shared';

import { ComponentsRoutingModule } from './components-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { RouterModule } from '@angular/router';
import { OfficeListComponent } from './main/office-list/office-list.component';
import {OfficeDetailsComponent} from './main/office-list/office-details/office-details.component';


import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent, ModalModule } from '../shared';
import { StaffComponent } from './main/staff/staff.component';
import { StoreModule } from '@ngrx/store';
import { NgInitDirective } from '../shared/directives/nginit.directive';
import { reducers } from './main/reducers/office.reducers';
import { OfficeEffects } from './main/effects/office.effects';



@NgModule({
  declarations: [OfficeComponent,
    OfficeListComponent,
    OfficeDetailsComponent,
    StaffComponent,
    LoadingComponent, NgInitDirective],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FontAwesomeModule,
    RouterModule,
    ReactiveFormsModule,
    ModalModule,
    StoreModule.forFeature('offices', reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forFeature([ OfficeEffects])],
})
export class ComponentsModule {
}
