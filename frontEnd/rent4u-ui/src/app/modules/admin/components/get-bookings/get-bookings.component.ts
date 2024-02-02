import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-get-bookings',
  templateUrl: './get-bookings.component.html',
  styleUrls: ['./get-bookings.component.css']
})
export class GetBookingsComponent {

  bookings:any;

  constructor(private adminService:AdminService){}


  ngOnInit(){
    this.getBookings();
  }

  getBookings(){
    this.adminService.getBookings().subscribe({
      next:res =>{
        this.bookings = res;
      },
      error:err =>{
        console.log("the error is: " + err)
      }
    })
  }



  changeBookingStatus(bookingId:number, status:string){
    this.adminService.changeBookingStatus(bookingId,status).subscribe({
     next:res =>{
       this.getBookings();
     },
     error:err =>{

     }
    })
 }






}
