import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AddPhotoComponent } from 'src/app/components/user/add-photo/add-photo.component';
import { PhotoService } from 'src/app/services/user/photo.service';
import { UserPhoto } from 'src/app/model/user/user-photo';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private popoverController: PopoverController, public photoService: PhotoService) { }

  async ngOnInit() {
  }

  async addPhotoPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: AddPhotoComponent,
      cssClass: 'my-custom-class',
      translucent: true,
      event: ev,
      mode: 'ios'
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }

}
