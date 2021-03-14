import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MaterialModule } from '../material.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutPromptComponent } from './logoutprompts.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthEffects } from 'src/app/store/effects/auth.effects';
import { reducers } from 'src/app/store/state';
import { environment } from 'src/environments/environment.prod';

@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent, LogoutPromptComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  entryComponents: [LogoutPromptComponent],
})
export class AuthModule { }
