import { OfficeComponent } from './office/office.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [OfficeComponent],
  imports: [CommonModule, ComponentsRoutingModule, FontAwesomeModule],
})
export class ComponentsModule {}
