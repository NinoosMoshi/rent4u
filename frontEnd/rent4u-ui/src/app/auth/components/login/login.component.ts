import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService){}


    ngOnInit():void{
      this.loginForm = this.fb.group({
        email:[null, [Validators.required, Validators.email]],
        password:[null, [Validators.required, Validators.minLength(6)]]
        })
    }

    togglePasswordVisibility() {
      this.passwordFieldType = (this.passwordFieldType === 'password') ? 'text' : 'password';
    }

    onSubmit(){
      this.spinner.show();
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;


      this.authService.userActive(email,password).subscribe({
        next:res =>{
                 setTimeout(() => {
                      this.spinner.hide();
                    }, 2000);
          let ac = res.active;
          if(ac == 1){
            this.authService.login(email, password).subscribe({
              next: res =>{
                this.toastr.success('Success', 'You Logging Successfully', {timeOut: 2000});

                 if(StorageService.isAdminLoggedIn()){
                    this.router.navigateByUrl("/admin/dashboard")
                  }
                  else if(StorageService.isCustomerLoggedIn()){
                    this.router.navigateByUrl("/customer/dashboard")
                  }
              },
              error: err =>{
                this.toastr.error('Error', 'your credentials are invalid', {timeOut: 2000})
                setTimeout(() => { this.spinner.hide();}, 2000);

              }
      })
          }
          else if(ac == 0){
              sessionStorage.setItem("emailAtive",email);
              this.router.navigateByUrl("/active-code")
          }
          else{
            this.toastr.error('Error', 'your credentials are invalid', {timeOut: 2000})
          }

        },
        error:err =>{
          this.toastr.error('Error', 'There is something wrong', {timeOut: 2000})
        }
      })


     }


}
