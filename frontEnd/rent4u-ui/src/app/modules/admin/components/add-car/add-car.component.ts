import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent {

  carForm!:FormGroup;

  listOfBrands = ['BMW','AUDI','TESLA','TOYOTA','HONDA'];
  listOfColor = ['Red', 'White', 'Blue', 'Black'];
  listOfType = ['Petrol','Hybrid', 'Diesel', 'Electric'];

  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  listOfOption: Array<{label:string; value:string}> = [];




  constructor(private fb:FormBuilder,
              private adminService:AdminService,
              private router:Router,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService){}


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
}



addCar() {
  if(this.carForm.valid){
    this.spinner.show();
    console.log(this.carForm.value)
    const formData:FormData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('brand', this.carForm.get('brand').value);
    formData.append('name', this.carForm.get('name').value);
    formData.append('type', this.carForm.get('type').value);
    formData.append('color', this.carForm.get('color').value);
    formData.append('year', this.carForm.get('year').value);
    formData.append('price', this.carForm.get('price').value);
    formData.append('description', this.carForm.get('description').value);


     this.adminService.addCar(formData).subscribe({
      next:res =>{
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
        this.router.navigateByUrl("/admin/dashboard")
        this.toastr.success('Success', 'New Car Added Successfully', {timeOut: 2000});
      },
      error:err =>{
        this.toastr.error('Error', 'An error occurred while posting a new car.', {timeOut: 2000})
      }
     })

  }
  else{
    for(const i in this.carForm.controls){
      this.carForm.controls[i].markAsDirty();
      this.carForm.controls[i].updateValueAndValidity();

    }
  }
}




onFileSelected(event:any){
  this.selectedFile = event.target.files[0];
  this.PreviewImage();
}


PreviewImage() {
  const reader = new FileReader();
  reader.onload = () =>{
    this.imagePreview = reader.result;
  }
  reader.readAsDataURL(this.selectedFile);
}


}
