import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { faEllipsisV, faPhoneAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { OfficeComponent } from './office/office.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [OfficeComponent],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FontAwesomeModule,
    RouterModule,
    NgbModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {
  constructor() {
    library.add(faPhoneAlt, faEllipsisV, faUserFriends);
  }
}
