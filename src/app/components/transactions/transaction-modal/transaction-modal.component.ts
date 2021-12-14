import { ModalController, ToastController } from '@ionic/angular';
import { TransactionsService } from './../../../services/transactions/transactions.service';
import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/model/transaction/transaction';
import { BalanceService } from 'src/app/services/balance/balance.service';

@Component({
  selector: 'app-transaction-modal',
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.scss'],
})
export class TransactionModalComponent implements OnInit {

  // variables
  balance: number;
  transaction: Transaction = { id: undefined, topic: 'Deposit', amount: undefined, date: new Date(),year: undefined, month: undefined, day: undefined, description: 'Deposit to account', type: '', icon: 'cash-outline'};

  constructor(
    private transactionsService: TransactionsService,
    public balanceService: BalanceService,
    public modalController: ModalController,
    private toastController: ToastController) { }

  ngOnInit() {}

  // al llamar a esta función comprobará si los campos están completos y posteriormente
  // llamará al servicio saveTransactión para almacenar el ingreso como una transacción y a 
  // su vez llamará al servicio saveBalance para almacenar el ingreso junto al total del dinero
  callSaveBalanceAndTransaction() {
    if (this.balance == undefined){
      this.emptyBalanceAlert();
    } else {
      this.transaction.amount = this.balance;
      this.transactionsService.saveTransaction(this.transaction);

      this.balanceService.saveBalance(this.balance);
      this.modalController.dismiss();

      this.successfulAmountAdded();
    }
   
  }

  // si no has rellenado los campos se muestra este toast para avisar
  async emptyBalanceAlert() {
    const toast = await this.toastController.create({
      mode: 'ios',
      keyboardClose: true,
      message: 'You must fill the camps',
      duration: 2000
    });
    toast.present();
  }

  // al añadir dinero aparece este toas
  async successfulAmountAdded() {
    const toast = await this.toastController.create({
      mode: 'ios',
      keyboardClose: true,
      message: 'Amount added successfully',
      duration: 2500
    });
    toast.present();
  }

}
