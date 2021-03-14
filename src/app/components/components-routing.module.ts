
import { OfficeDetailsComponent } from './main/office-list/office-details/office-details.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfficeListComponent } from './main/office-list/office-list.component';
import { AuthGuardService } from '../services';


const routes: Routes = [
  { path: '', component: OfficeListComponent, canActivate: [AuthGuardService]},
  { path: ':id', component: OfficeDetailsComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
