import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/components/signup/signup.component';
import { CodeActivationComponent } from './auth/components/code-activation/code-activation.component';

const routes: Routes = [
  { path:'active-code', component:CodeActivationComponent},
  {path:'register', component:SignupComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
