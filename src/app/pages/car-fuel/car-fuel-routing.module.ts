import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarFuelPage } from './car-fuel.page';

const routes: Routes = [
  {
    path: '',
    component: CarFuelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarFuelPageRoutingModule {}
