import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { CodeActivationComponent } from './auth/components/code-activation/code-activation.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoAngularMaterialModules } from './DemoAngularMaterialModules';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CodeActivationComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoAngularMaterialModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
