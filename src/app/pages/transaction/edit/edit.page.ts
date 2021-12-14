import { Balance } from './../../../model/balance/balance';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController, ToastController, AlertController } from '@ionic/angular';
import { Budget } from 'src/app/model/budget/budget';
import { Transaction } from 'src/app/model/transaction/transaction';
import { BalanceService } from 'src/app/services/balance/balance.service';
import { BudgetsService } from 'src/app/services/budgets/budgets.service';
import { TransactionsService } from 'src/app/services/transactions/transactions.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  // TRANSACTION OBJECT
  transaction: Transaction = { id: undefined, topic: '', amount: undefined, date: undefined,year: undefined, month: undefined, day: undefined, description: '', type: '', icon: '', budgetId: undefined};
  transactionAmountEdit: number;

  // BUDGETS ARRAY AND BUDGET OBJECT
  budgets: Budget[] = [];
  budget: Budget = {id: undefined, title: '', amount: 200, icon: '', fullAmount: undefined };
  budgetRestore: Budget = {id: undefined, title: '', amount: 200, icon: '', fullAmount: undefined };

  // BALANCE
  balance: number = undefined;

  constructor(
    private transactionsService: TransactionsService, 
    private router: Router, 
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    public budgetsService: BudgetsService,
    private balanceService: BalanceService,
    private alertController: AlertController) { 
    }

  ngOnInit() {
    // recoge la cantidad de dinero disponible
    this.balanceService.getBalance().subscribe(data => this.balance = data);
    console.log(this.balance);

    // recoge el id de la url
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    // recoge el array de budgets de budgetsService
    this.budgetsService.getBudgets().subscribe(data => this.budgets = data);

    // si existe una id, recoge todos los datos de la transacción
    // llamanddo al servicio transactionsService
    if (id != null) {
      this.transactionsService.getTransaction(+id).subscribe(
        data => this.transaction = data
      );
      
      // si existe la la id de la transacción, iguala transaction.amout
      // a transactionAmountEdit para su posterior uso
      this.transactionAmountEdit = this.transaction.amount;
      this.transaction.amount = undefined;
      
      // si la transacción existe, almacena los datos del tipo de transacción en budgetRestore
      this.budgetsService.getBudget(this.transaction.budgetId).subscribe(data => this.budgetRestore = data);

      // si la transacción existe, la cantidad de la transacción se suma al budget amount
      this.budgetRestore.amount -= this.transactionAmountEdit;
    }
  }

  // llama al servicio para poder almacenar los datos de la transacción
  callSaveTransaction() {
    
    if (this.transaction.topic == '' || this.transaction.amount == undefined || this.transaction.date == undefined){
      this.emptyTaskAlert();
    } else {

      // si el tipo de transacción cambia, devuelve el dinero al presupuesto
      // correspondiente
      if (this.transaction.budgetId != this.budgetRestore.id && this.transaction.id != undefined && this.budgetRestore.id != undefined) {
        this.budgetsService.saveBudget(this.budgetRestore);
      }

      // si la variable existe guarda la cantidad de dinero que hay en dicha variable en "balance"
      // por si editamos la cantidad de la transacción, se sume la cantidad que había en nuestra cuenta
      if (this.transactionAmountEdit != undefined) {
        this.balanceService.saveBalance(-this.transactionAmountEdit);
      }
      
      // si la id de budget existe reasigna la cantidad de dinero
      if (this.transaction.budgetId == this.budgetRestore.id && this.budgetRestore.id != undefined){
        this.budgetRestore.amount -= this.transaction.amount;
        this.budgetsService.saveBudget(this.budgetRestore);
      }

      // resta la cantidad de dinero en el presupuesto correspondiente
      if(this.transaction.budgetId == this.budget.id && this.budget.id != undefined) {
        this.budget.amount -= this.transaction.amount;
        if (this.budget.amount <= 0)this.noMoneyAlert();
        this.budgetsService.saveBudget(this.budget);
      }

      // pasa el valor introducido a negativo para que se pueda restar en la cuenta
      this.transaction.amount = 0 - this.transaction.amount;
      this.balanceService.saveBalance(this.transaction.amount);

      // guarda la transacción y nos lleva a la lista de transacciones
      this.transactionsService.saveTransaction(this.transaction);
      this.redirectTo('/transactions')
      // this.router.navigateByUrl('/transactions', {skipLocationChange: true}).then(() => {this.router.navigate(['/transactions'])});
      
    }
   
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/homepage', {skipLocationChange: true}).then(() => this.router.navigate([uri]))
  }

  // al hacer clic en la categoría, se guarda la categoría junto al icono
  setTransactionCategory(category: string, icon: string, budgetId: number) {
    this.transaction.type = category;
    this.transaction.icon = icon;
    this.transaction.budgetId = budgetId;
    this.budgetsService.getBudget(this.transaction.budgetId).subscribe(data => this.budget = data);
  }


  // si no has rellenado los campos se muestra este toast para avisar
  async emptyTaskAlert() {
    const toast = await this.toastController.create({
      mode: 'ios',
      keyboardClose: true,
      message: 'You must fill the camps',
      duration: 2000
    });
    toast.present();
  }

  async noMoneyAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      mode: 'ios',
      message: `You have reached the planned budget amount of ${this.budget.title}`,
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  
}
