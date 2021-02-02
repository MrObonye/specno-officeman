import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AngularFireModule} from '@angular/fire';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { environment } from '../environments/environment.prod';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
