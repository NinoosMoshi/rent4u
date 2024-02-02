import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent {

  carId:number = this.activatedRoute.snapshot.params['id'];
  imgChanged:boolean = false;
  selectedFile:any;
  imagePreview:string | ArrayBuffer | null;

  existingImage:string | null = null;
  carForm!:FormGroup;
  listOfOption: Array<{label:string; value:string}> = [];
  listOfBrands = ['BMW','AUDI','TESLA','TOYOTA','HONDA'];
  listOfType = ['Petrol','Hybrid', 'Diesel', 'Electric'];
  listOfColor = ['Red', 'White', 'Blue', 'Black'];





 constructor(private fb:FormBuilder,
   private adminService:AdminService,
   private router:Router,
   private activatedRoute:ActivatedRoute){}



ngOnInit(){
 this.carForm = this.fb.group({
   brand:[null, Validators.required],
   name:[null, Validators.required],
   type:[null, Validators.required],
   color:[null, Validators.required],
   year:[null, Validators.required],
   price:[null, Validators.required],
   description:[null, Validators.required]
 })
 this.getCarById();
}


getCarById(){
  this.adminService.getCarById(this.carId).subscribe({
   next:res =>{
    console.log(res)
     const carDTO = res;
     this.existingImage = 'data:image/jpeg;base64,' + res.returnImage;
     this.carForm.patchValue(carDTO);
   },
   error:err =>{

   }
  })
}




updateCar(){
   const formData:FormData = new FormData();

   if(this.imgChanged && this.selectedFile){
    formData.append('image', this.selectedFile);
   }

   formData.append('brand',this.carForm.get('brand').value);
   formData.append('name',this.carForm.get('name').value);
   formData.append('type',this.carForm.get('type').value);
   formData.append('color',this.carForm.get('color').value);
   formData.append('year',this.carForm.get('year').value);
   formData.append('description',this.carForm.get('description').value);
   formData.append('price',this.carForm.get('price').value);


   this.adminService.updateCar(this.carId,formData).subscribe({

     next:res =>{
       console.log(this.carId)
       this.router.navigateByUrl("/admin/dashboard")
     },
     error:err =>{
       console.log(err)
     }
   })

}



onFileSelected(event:any){
  this.selectedFile = event.target.files[0];
  this.imgChanged = true;
  this.existingImage = null;
  this.previewImage();
}

previewImage(){
  const reader = new FileReader();
  reader.onload = () =>{
    this.imagePreview = reader.result;
  }
  reader.readAsDataURL(this.selectedFile);
}





}
