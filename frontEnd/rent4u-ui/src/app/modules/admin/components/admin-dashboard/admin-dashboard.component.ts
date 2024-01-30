import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  cars:any = [];

  constructor(private adminService:AdminService,
              private router:Router,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService){}

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



  deleteCar(id:number){
    this.spinner.show();
    this.adminService.deleteCar(id).subscribe({
      next:res =>{
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
        this.getAllCars()
        this.toastr.success('Success', 'Car Deleted Successfully', {timeOut: 2000});
        this.router.navigateByUrl("/admin/dashboard")
      },
      error:err =>{
        this.toastr.error('Error', 'Car Deletion Failed. There is an issue.', {timeOut: 2000});
        setTimeout(() => { this.spinner.hide();}, 2000);
      }
     })
  }




}
