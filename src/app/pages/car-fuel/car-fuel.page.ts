import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-fuel',
  templateUrl: './car-fuel.page.html',
  styleUrls: ['./car-fuel.page.scss'],
})
export class CarFuelPage implements OnInit {
  
  price: number = 0;

  distance: number = null;
  fuelConsuption: number = null;
  fuelPrice: number = null;

  constructor() { }

  ngOnInit() {
  }

  calcPrice(distance?: number, fuelConsuption?: number, fuelPrice?: number) {
    if (distance != null && fuelConsuption != null && fuelPrice != null) {
      this.price = 0;
      this.price = Math.round(((distance * fuelConsuption * fuelPrice) / 100) * 100) / 100;
    }
  }

  resetInputs() {
    this.distance = null;
    this.fuelConsuption = null;
    this.fuelPrice = null;
    this.price = 0;
  }
  

}
