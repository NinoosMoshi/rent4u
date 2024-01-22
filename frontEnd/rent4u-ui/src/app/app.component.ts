import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './auth/services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rent4u-ui';

  isCustomerLoggedIn:boolean = StorageService.isCustomerLoggedIn();
  isAdminLoggedIn:boolean = StorageService.isAdminLoggedIn();

  constructor(private router:Router){}

  ngOnInit(){
    this.router.events.subscribe(event =>{
      this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
      this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    })
  }


  logout(){
    StorageService.signOut();
    sessionStorage.removeItem("emailAtive")
    this.router.navigateByUrl("/login");
  }


}
