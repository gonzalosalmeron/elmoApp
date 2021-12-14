import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Budget } from 'src/app/model/budget/budget';
import { Transaction } from 'src/app/model/transaction/transaction';
import { BudgetsService } from 'src/app/services/budgets/budgets.service';
import { TransactionsService } from 'src/app/services/transactions/transactions.service';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.page.html',
  styleUrls: ['./budgets.page.scss'],
})
export class BudgetsPage implements OnInit {

  budgets: Budget[] = [];

  transactions: Transaction[] = []

  constructor(public budgetsService: BudgetsService, 
    private router: Router, 
    private alertController: AlertController, 
    private transactionsService: TransactionsService,
    private toastController: ToastController) {}

  ngOnInit() {
    this.budgetsService.getBudgets().subscribe(data => this.budgets = data);
  }

  goEditBudget(id: number){
    this.router.navigateByUrl(`budget/edit${id != undefined ? '/' + id : ''}`);
  }

  callDeleteBudget(budget: Budget) {
    this.deleteAlertConfirm(budget);
  }

  async deleteAlertConfirm(budget: Budget) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atention!',
      mode: 'ios',
      message: `You are about to delete ${budget.title}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Okay',
          handler: () => {
            this.budgetsService.deleteBudget(budget.id);
            this.successfulDelete();
            this.ngOnInit();
          }
        }
      ]
    });

    await alert.present();
  }

  // al eliminar una budget aparece este toast
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
