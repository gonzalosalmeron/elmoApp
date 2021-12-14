import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InitslidePageRoutingModule } from './initslide-routing.module';

import { InitslidePage } from './initslide.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InitslidePageRoutingModule,
    SwiperModule
  ],
  declarations: [InitslidePage]
})
export class InitslidePageModule {}
