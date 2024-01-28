import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { GetBookingsComponent } from './components/get-bookings/get-bookings.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { SearchCarComponent } from './components/search-car/search-car.component';
import { UpdateCarComponent } from './components/update-car/update-car.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DemoAngularZorroModules } from 'src/app/DemoAngularZorroModules';




@NgModule({
  declarations: [
    AdminDashboardComponent,
    GetBookingsComponent,
    AddCarComponent,
    SearchCarComponent,
    UpdateCarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DemoAngularZorroModules
  ]
})
export class AdminModule { }
