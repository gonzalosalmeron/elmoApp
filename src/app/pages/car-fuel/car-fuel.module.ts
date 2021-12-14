import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarFuelPageRoutingModule } from './car-fuel-routing.module';

import { CarFuelPage } from './car-fuel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarFuelPageRoutingModule
  ],
  declarations: [CarFuelPage]
})
export class CarFuelPageModule {}
