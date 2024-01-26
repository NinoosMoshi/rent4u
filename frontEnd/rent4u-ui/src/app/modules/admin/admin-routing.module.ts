import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { GetBookingsComponent } from './components/get-bookings/get-bookings.component';
import { SearchCarComponent } from './components/search-car/search-car.component';
import { UpdateCarComponent } from './components/update-car/update-car.component';
import { AddCarComponent } from './components/add-car/add-car.component';

const routes: Routes = [
  {path:'dashboard', component:AdminDashboardComponent},
  {path:'car', component: AddCarComponent},
  {path:'car/:id', component: UpdateCarComponent},
  {path:'bookings', component: GetBookingsComponent},
  {path:'search', component: SearchCarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
