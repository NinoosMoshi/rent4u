import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { SearchCarComponent } from './components/search-car/search-car.component';
import { BookCarComponent } from './components/book-car/book-car.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';


const routes: Routes = [
  {path:'dashboard', component:CustomerDashboardComponent},
  {path:'book/:id', component:BookCarComponent},
  {path:'my-bookings', component:MyBookingsComponent},
  {path:'search', component:SearchCarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
