import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

// IMPORTS
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = null;
  email: string = null;
  pass: string = null;
  cfrmpass: string = null;

  msg: string;

  constructor(private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  checkRegister() {
    if (this.username == null || this.email == null || this.pass == null || this.cfrmpass == null) {
      this.emptyToast();
    } else {
      if (this.pass.length < 6) {
        this.minPassLenghtToast() 
      } else {
        if (this.pass != this.cfrmpass) {
          this.passNotMatchToast();
        } else {
          this.succesfulToast();
          this.router.navigateByUrl('login');
        }
      }
    }
  }

  async emptyToast() {
    const toast = await this.toastController.create({
      message: 'You must fill the camps',
      mode: 'ios',
      duration: 2000
    });
    toast.present();
  }

  async minPassLenghtToast() {
    const toast = await this.toastController.create({
      message: 'Password must have at least 6 characters',
      mode: 'ios',
      duration: 2000
    });
    toast.present();
  }

  async passNotMatchToast() {
    const toast = await this.toastController.create({
      message: 'Password does not match',
      mode: 'ios',
      duration: 2000
    });
    toast.present();
  }

  async succesfulToast() {
    const toast = await this.toastController.create({
      message: 'Succesful register!!',
      mode: 'ios',
      duration: 2000
    });
    toast.present();
  }

}
