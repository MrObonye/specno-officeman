
import { OfficeDetailsComponent } from './office-list/office-details/office-details.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfficeListComponent } from './office-list/office-list.component';


const routes: Routes = [
  { path: '', component: OfficeListComponent },
  { path: 'office/:id', component: OfficeDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
