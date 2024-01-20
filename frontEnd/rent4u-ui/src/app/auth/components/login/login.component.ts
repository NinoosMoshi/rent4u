import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!:FormGroup;
  passwordFieldType: string = 'password';


  constructor(private fb:FormBuilder,
              private authService: AuthService,
              private router: Router){}

    ngOnInit(){
      this.loginForm = this.fb.group({
        email:[null, [Validators.required]],
        password:[null, [Validators.required]]
        })
    }


  togglePasswordVisibility() {
    this.passwordFieldType = (this.passwordFieldType === 'password') ? 'text' : 'password';
  }

  onSubmit(){
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;


    this.authService.userActive(email,password).subscribe({
      next:res =>{
        let ac = res.active;
        if(ac == 1){
          this.authService.login(email, password).subscribe({
            next: res =>{

              alert("you login in successfully")
               if(StorageService.isAdminLoggedIn()){
                  this.router.navigateByUrl("/admin/dashboard")
                }
                else if(StorageService.isCustomerLoggedIn()){
                  this.router.navigateByUrl("/customer/dashboard")
                }
            },
            error: err =>{
              alert('Bad credentials.')
            }
    })
        }
        else if(ac == 0){
            sessionStorage.setItem("emailAtive",email);
            this.router.navigateByUrl("/active-code")
        }
        else{
          alert("Invalid Credentails")
        }

      },
      error:err =>{

      }
    })
   }



}
