import { PhotoService } from 'src/app/services/user/photo.service';
import { BudgetsService } from './../../services/budgets/budgets.service';
import { BalanceService } from './../../services/balance/balance.service';
import { TransactionsService } from './../../services/transactions/transactions.service';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Budget } from 'src/app/model/budget/budget';
import { Transaction } from 'src/app/model/transaction/transaction';
import { TransactionModalComponent } from 'src/app/components/transactions/transaction-modal/transaction-modal.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  categories = ['Food', 'Online Shopping', 'Amazon', 'Car components', 'Electronics', 'a;lkdfas;ldkfas'];

  budgets: Budget[] = [];

  transactions: Transaction[] = [];

  constructor(
    private router: Router, 
    public transactionsService: TransactionsService, 
    private modalController: ModalController,
    public balanceService: BalanceService,
    public budgetsService: BudgetsService,
    public photoService: PhotoService) { }

  ngOnInit() { }

  // te lleva a la creación de una transacción
  goEditTransaction() {
    this.router.navigateByUrl('transactions/edit');
  }

  // te lleva a los ajustes del usuario
  goUserSettings() {
    this.router.navigateByUrl('settings/user');
  }

  // te **deslogea** de la app
  logout() {
    this.router.navigateByUrl('welcome')
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

}
