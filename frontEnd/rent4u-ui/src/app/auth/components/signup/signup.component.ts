import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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


ngOnInit(): void{
  this.signupForm = this.fb.group({
      name:[null, [Validators.required]],
      email:[null, [Validators.required]],
      password:[null, [Validators.required]],
      confirmPassword:[null, [Validators.required]]
      })
}

  togglePasswordVisibility() {
    this.passwordFieldType = (this.passwordFieldType === 'password') ? 'text' : 'password';
  }

  onSubmit(){
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if(password !== confirmPassword){
      alert('Passwords do not match.')
      return;
    }

    this.authService.register(this.signupForm.value).subscribe({
      next:res =>{
        if(res.result == 1){
          sessionStorage.setItem("emailAtive",email);
          alert('Sign up successful!.')
          this.router.navigateByUrl("/active-code")
        }else{
          alert("email is exists")
        }

      },
      error:err =>{
        alert('Sign up faild. Please try again.')
      }
    })

  }



}
