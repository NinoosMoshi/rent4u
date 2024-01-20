import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeActivationComponent } from './auth/components/code-activation/code-activation.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { SignupComponent } from './auth/components/signup/signup.component';

const routes: Routes = [
  {path:'reset', component:ResetPasswordComponent},
  { path:'active-code', component:CodeActivationComponent},
  {path:'register', component:SignupComponent},
  {path:'login', component:LoginComponent},

  {path:'admin', loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule)},
  {path:'customer', loadChildren: () => import("./modules/customer/customer.module").then(m => m.CustomerModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
