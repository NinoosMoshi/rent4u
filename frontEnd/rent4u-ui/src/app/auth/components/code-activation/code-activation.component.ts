import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-code-activation',
  templateUrl: './code-activation.component.html',
  styleUrls: ['./code-activation.component.css']
})
export class CodeActivationComponent {

  codeForm!: FormGroup;
  email:string = '';

  constructor(private fb: FormBuilder,
              private authService:AuthService,
              private router: Router){}


  ngOnInit(): void{
    this.email = sessionStorage.getItem("emailAtive")
  }


  onSubmit(){
    const code = this.codeForm.get('code')?.value;

    this.authService.activeAccount(this.email,code).subscribe({
      next:res =>{
        if(res.result == 1){
          this.router.navigateByUrl("/login");
        }else{
          alert("Invalid Code")
        }
      },
      error:err =>{

      }
    })
}


}
