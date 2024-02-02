import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

@Component({
  selector: 'app-book-car',
  templateUrl: './book-car.component.html',
  styleUrls: ['./book-car.component.css']
})
export class BookCarComponent {


  carId:number = this.activatedRoute.snapshot.params['id'];
  car:any;
  processedImage:any;
  validateForm!:FormGroup;
  dateFormat="MM-dd-YYYY";

  constructor(private customerService:CustomerService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private fb:FormBuilder){}


  ngOnInit(){
    this.validateForm = this.fb.group({
      fullname:[null, Validators.required],
      phone:[null, Validators.required],
      email:[null, Validators.required],
      toDate:[null, Validators.required],
      fromDate:[null, Validators.required]
    })
    this.getCarById();
  }


  getCarById(){
    this.customerService.getCarById(this.carId).subscribe({
      next: res=>{
        this.processedImage = 'data:image/jpeg;base64,' + res.returnImage;
        this.car = res;
      },
      error: err =>{
         console.log("error is: " + err.message)
      }
    })
  }


  bookCar(data:any){
    // this.isSpinning = true;
    let bookCarDTO = {
      // fullname: this.validateForm.get('fullname')?.value,
      // phone: this.validateForm.get('phone')?.value,
      // email: this.validateForm.get('email')?.value,
      toDate: data.toDate,
      fromDate: data.fromDate,
      userId: StorageService.getUserId(),
      carId: this.carId
    }

    // console.log(bookCarDTO.fullname);
    // console.log(bookCarDTO.phone);
    // console.log(bookCarDTO.email);
    console.log(bookCarDTO.toDate);
    console.log(bookCarDTO.fromDate);
    console.log(bookCarDTO.userId);
    console.log(bookCarDTO.carId);

    this.customerService.bookCarTemp(this.carId,bookCarDTO).subscribe({
      next: res =>{
         console.log(res)
        //  this.message.success("Booking requesr submitted successfully", {nzDuration:5000})
         this.router.navigateByUrl("/customer/dashboard")
      },
      error: err =>{
        console.log(err.message)
        // this.message.error("something wen wrong", {nzDuration:5000})
      }
    })
  }



}
