import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm!: FormGroup;
  passwordFieldType: string = 'password';


  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router){}

    ngOnInit():void{
      this.signupForm = this.fb.group({
        name:[null, [Validators.required, Validators.minLength(3)]],
        email:[null, [Validators.required, Validators.email]],
        password:[null, [Validators.required, Validators.minLength(6)]],
        confirmPassword:[null, [Validators.required, this.confirmationValidate]]
        })
    }


    confirmationValidate = (control: FormControl): { [s: string]: boolean } => {
      if (!control.value) {
        return { require: true };
      } else if (control.value !== this.signupForm.controls['password'].value) {
        return { confirm: true };
      }
      return {};
    }



    togglePasswordVisibility() {
      this.passwordFieldType = (this.passwordFieldType === 'password') ? 'text' : 'password';
    }



    register(){
      const email = this.signupForm.get('email')?.value;
      this.authService.register(this.signupForm.value).subscribe({
        next:res =>{
          if(res.result == 1){
            sessionStorage.setItem("emailAtive",email);
            this.router.navigateByUrl("/active-code")
          }else{

          }

        },
        error:err =>{

        }
      })
  }




}
