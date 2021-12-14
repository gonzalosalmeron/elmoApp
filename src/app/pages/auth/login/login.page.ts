import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

// IMPORTS
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = null;
  password: string = null;

  constructor(private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  goWelcome() {
    this.router.navigateByUrl('welcome')
  }

  checkLogin() {
    if (this.email == null || this.password == null) {
      this.checkEmptyToast();
    } else {
      if (this.email != "test@test.com" && this.password != "123456") {
        this.checkLoginToast();
      } else {
        this.router.navigateByUrl('homepage');
      }
    }
    
  }

  async checkEmptyToast() {
    const toast = await this.toastController.create({
      message: 'You must fill the camps',
      mode: 'ios',
      duration: 2000
    });
    toast.present();
  }

  async checkLoginToast() {
    const toast = await this.toastController.create({
      message: 'Check your email and password',
      mode: 'ios',
      duration: 2000
    });
    toast.present();
  }

}
