import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.css']
})
export class SearchCarComponent {

  searchCarForm!:FormGroup
  isSpinning:boolean = false;
  cars:any = [];

  listOfBrands = ['BMW','AUDI','TESLA','TOYOTA','HONDA'];
  listOfType = ['Petrol','Hybrid', 'Diesel', 'Electric'];
  listOfColor = ['Red', 'White', 'Blue', 'Black'];

 constructor(private fb:FormBuilder, private customerService:CustomerService){}

 ngOnInit(){
   this.searchCarForm = this.fb.group({
    brand:[null],
    type:[null],
    color:[null]
   })
 }


 searchCar(){
  //  this.isSpinning = true
   this.cars = []
   this.customerService.searchCar(this.searchCarForm.value).subscribe({
    next:res =>{
      res.carDTOList.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnImage;
        this.cars.push(element);
      });
      // this.isSpinning = false;
    },
    error:err =>{

    }
   })
 }




}
