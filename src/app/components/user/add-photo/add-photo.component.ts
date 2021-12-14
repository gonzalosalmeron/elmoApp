import { AlertController } from '@ionic/angular';
import { PhotoService } from './../../../services/user/photo.service';
import { Component, OnInit } from '@angular/core';
import { UserPhoto } from 'src/app/model/user/user-photo';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss'],
})
export class AddPhotoComponent implements OnInit {

  constructor(private photoService: PhotoService, private alertController: AlertController) { }

  ngOnInit() {

  }

  addPhotoGallery() {
    this.photoService.addProfilePhoto();
  }

  callDeletePhoto() {
    this.deletePhotoAlert();
  }

  async deletePhotoAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      mode: 'ios',
      message: 'You are about to delete your profile picture, are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Okay',
          handler: () => {
            this.photoService.deletePhoto();
          }
          
        }
      ]
    });

    await alert.present();
  }

}
