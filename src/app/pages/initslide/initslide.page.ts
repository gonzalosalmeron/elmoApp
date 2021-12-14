import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import SwiperCore, { SwiperOptions, Pagination, EffectFlip } from 'swiper';

SwiperCore.use([Pagination, EffectFlip]);
@Component({
  selector: 'app-initslide',
  templateUrl: './initslide.page.html',
  styleUrls: ['./initslide.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InitslidePage implements OnInit {

  config: SwiperOptions = {
    effect: 'flip',
    pagination: true
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goWelcomePage() {
    this.router.navigateByUrl('welcome')
  }

}
