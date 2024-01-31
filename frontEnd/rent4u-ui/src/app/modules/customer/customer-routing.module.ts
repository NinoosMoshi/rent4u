import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { SearchCarComponent } from './components/search-car/search-car.component';


const routes: Routes = [
  {path:'dashboard', component:CustomerDashboardComponent},
  {path:'search', component:SearchCarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
