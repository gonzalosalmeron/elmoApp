import { BudgetsService } from './../../../services/budgets/budgets.service';
import { BalanceService } from 'src/app/services/balance/balance.service';
import { Router } from '@angular/router';
import { TransactionsService } from './../../../services/transactions/transactions.service';
import { Component, OnInit } from '@angular/core';
import { Budget } from 'src/app/model/budget/budget';
import { Transaction } from 'src/app/model/transaction/transaction';
import { AlertController, ToastController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {

  // TRANSACTIONS ARRAY
  transactions: Transaction[] = [];
  transactionsCopy: Transaction[] = [];

  tests = ['hola', 'quepasa', 'asdf', 'asdf', 'quepasa', 'asdf', 'asdf', 'quepasa', 'asdf', 'asdf']

  // VARIABLES NEEDED FOR FILTERRING
  actualMonth: string = moment().format('MMMM');
  actualYear: number = moment().year();
  yearD: string = this.actualYear + '';
  numberdays: number = moment(moment(this.actualMonth, 'MMMM').format('MM'), 'MM').daysInMonth();
  days = [];
  years = [];
  budgetRestore: Budget = {id: undefined, title: '', amount: 200, icon: '', fullAmount: undefined };
  daySelected: string;

  constructor(public transactionsService: TransactionsService, 
    private router: Router, 
    private alertController: AlertController, 
    private balanceService: BalanceService, 
    private budgetsService:BudgetsService,
    private toastController: ToastController) { }

  ngOnInit() {
    this.filterTransactionByDate();
    this.days = Array(this.numberdays).fill(0).map((x,i)=>i + 1);
    for (let i = 0; i < 10; i++) this.years.push(this.actualYear - i);
  }

  getAllTransactions() {
    this.transactionsService.getTransactions().subscribe(data => this.transactions = data);
    this.transactions.sort((a,b) => moment(a.date).valueOf() - moment(b.date).valueOf()).reverse();
  }

  // TE LLEVA A LA PAGINA DE EDIT TRANSACTION
  goEditTransaction(id: number){
    this.router.navigateByUrl(`transactions/edit${id != undefined ? '/' + id : ''}`);
  }

  // LLAMA A DELETE TRANSACTION PREVIAMENTE LLAMANDO AL DELETE ALERT CONFIRM
  callDeleteTransaction(transaction: Transaction) {
    this.deleteAlertConfirm(transaction);
  }

  // REALIZA EL FILTRADO DE TRANSACTIONS
  filterTransactionByDate(day?: number) {
    this.getAllTransactions();
    let year = parseInt(this.yearD);
    // en caso de que year != 1 (1 es todos) filtrará por el año indicado
    if (year != 1) this.transactions = this.transactions.filter(data => data.year == year);

    // en caso de que actualMonth != all, filtrará por el mes indicado
    if (this.actualMonth != 'all'){
      this.transactions = this.transactions.filter(data => data.month == this.actualMonth);
      if (day) {
        this.daySelected = day < 10 ? (0 + '' + day) : ('' + day);
        console.log(this.daySelected);
        this.transactions = this.transactions.filter(data => data.day == this.daySelected);
      }
      this.daySelected = '';
      this.numberdays = moment(moment(this.actualMonth, 'MMMM').format('MM'), 'MM').daysInMonth();
      this.days = Array(this.numberdays).fill(0).map((x,i)=>i + 1);
      console.log(this.days)
    }
  }

  // EJECUTA UNA ALERTA PARA AVISAR DE QUE ESTAS A PUNTO DE ELIMINAR UNA TRANSACCIÓN
  async deleteAlertConfirm(transaction: Transaction) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atention!',
      mode: 'ios',
      message: `You are about to delete ${transaction.topic}. <br><br> The amount of this balance will be added or remove from your account.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Okay',
          handler: () => {
            // RECOGE EL BUDGET Y LO GUARDA AGREGANDOLE LA CANTIDAD QUE LE CORRESPONDE
            this.budgetsService.getBudget(transaction.budgetId).subscribe(data => this.budgetRestore = data);
            if (this.budgetRestore.id != undefined) {
              this.budgetRestore.amount -= transaction.amount;
              this.budgetsService.saveBudget(this.budgetRestore);
            }
            this.successfulDelete();
            this.balanceService.saveBalance(-transaction.amount);
            this.transactionsService.deleteTransaction(transaction.id);
            this.ngOnInit();
          }
        }
      ]
    });

    await alert.present();
  }

  // al eliminar una transacción aparece este toast
  async successfulDelete() {
    const toast = await this.toastController.create({
      mode: 'ios',
      keyboardClose: true,
      message: 'Successful delete',
      duration: 2000
    });
    toast.present();
  }
  

}
