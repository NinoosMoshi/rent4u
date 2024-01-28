import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  cars:any = [];

  constructor(private adminService:AdminService,
              private router:Router){}

  ngOnInit(){
    this.getAllCars();
  }



  getAllCars(){
    this.cars = [];
    this.adminService.getAllCars().subscribe({
      next:res =>{
        res.forEach(element =>{
          element.processedImg = 'data:image/jpeg;base64,' + element.returnImage;
          this.cars.push(element);
        })
      },
      error:err =>{
        console.log("there is an error")
      }
    })
  }




}
