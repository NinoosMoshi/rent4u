import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent {

  cars:any = [];


  constructor(private customerService:CustomerService,
              private router:Router){}

  ngOnInit(){
    this.getAllCars();
  }



  getAllCars(){
    this.cars = [];
    this.customerService.getAllCars().subscribe(res =>{
       res.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.returnImage;
          this.cars.push(element);
       });
    })
  }



}
