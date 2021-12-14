import { ModalController, ToastController } from '@ionic/angular';
import { TransactionModalComponent } from 'src/app/components/transactions/transaction-modal/transaction-modal.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-toolbar',
  templateUrl: './footer-toolbar.component.html',
  styleUrls: ['./footer-toolbar.component.scss'],
})
export class FooterToolbarComponent implements OnInit {

  constructor(private router:Router, private modalController: ModalController, private toastController: ToastController) { }

  ngOnInit() {}

  goViewBudgets() {
    this.router.navigateByUrl('/budgets')
  }

  goViewTransactions() {
    this.router.navigateByUrl('/transactions')
  }

  goCarFuel() {
    this.router.navigateByUrl('/car-fuel')
  }

  async openDepositModal() {
    const modal = await this.modalController.create({
      component: TransactionModalComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    return await modal.present();
  }

  async onDevelopmentToast() {
    const toast = await this.toastController.create({
      message: 'This in on development.',
      duration: 2000,
      mode: 'ios'
    });
    toast.present();
  }

}
