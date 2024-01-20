import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  emailForm!: FormGroup;
  resetForm!: FormGroup;
  enableFrom: boolean = true;

  passwordFieldType: string = 'password';

  togglePasswordVisibility() {
    this.passwordFieldType = (this.passwordFieldType === 'password') ? 'text' : 'password';
  }



}
