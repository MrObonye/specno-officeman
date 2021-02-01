import { OfficeEditComponent } from './office-list/office-edit/office-edit.component';
import { OfficeListComponent } from './office-list/office-list.component';
import { OfficeComponent } from './office-list/office/office.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: OfficeListComponent, children: [
    {path: 'office', component: OfficeComponent},
    {path: 'edit', component: OfficeEditComponent},
    {path: 'new', component: OfficeEditComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
