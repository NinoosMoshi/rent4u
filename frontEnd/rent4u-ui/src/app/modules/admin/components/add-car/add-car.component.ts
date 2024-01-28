import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
              private router:Router){}


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


    //  this.adminService.postCar(formData).subscribe({
    //   next:res =>{
    //     this.isSpinning = false
    //     this.message.success("Car posted successfully", {nzDuration:5000})
    //     this.router.navigateByUrl("/admin/dashboard")
    //   },
    //   error:err =>{
    //     this.message.error("Error while post car", {nzDuration:5000})
    //   }
    //  })

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
