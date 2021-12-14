import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  // GO LOGIN PAGE
  goLoginPage() {
    this.router.navigateByUrl('login');
  }

  // GO REGISTER PAGE
  goRegisterPage() {
    this.router.navigateByUrl('register');
  }

}
