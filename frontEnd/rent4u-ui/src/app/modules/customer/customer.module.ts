import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { DemoAngularZorroModules } from 'src/app/DemoAngularZorroModules';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchCarComponent } from './components/search-car/search-car.component';


@NgModule({
  declarations: [
    CustomerDashboardComponent,
    SearchCarComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    DemoAngularZorroModules,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class CustomerModule { }
