import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, PopoverController } from '@ionic/angular';
import { Budget } from 'src/app/model/budget/budget';
import { BudgetsService } from 'src/app/services/budgets/budgets.service';
import { CheckBalanceComponent } from 'src/app/components/budgets/check-balance/check-balance.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  icons = ['car', 'card', 'bag', 'shirt', 'fast-food', 'beer', 'home', 'barbell'];

  budget: Budget = {id: undefined, title: '', amount: 200, icon: '', fullAmount: undefined };

  amountTitle = '';
  amountDescription = '';

  constructor(
    private transactionsService: BudgetsService, 
    private router: Router,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private popoverController: PopoverController
  ) { 
    if (this.budget.amount <= 50) {
      this.amountTitle = 'Very low';
      this.amountDescription = 'Oh, you are a poor man.';
    } else if (this.budget.amount > 50 && this.budget.amount <= 200) {
      this.amountTitle = 'Low';
      this.amountDescription = 'You are being catius';
    } else if (this.budget.amount > 200 && this.budget.amount <= 800) {
      this.amountTitle = 'Normal';
      this.amountDescription = 'Men, you are going the right way';
    } else if (this.budget.amount > 800 && this.budget.amount <= 3000) {
      this.amountTitle = 'High';
      this.amountDescription = 'Careful, this is a large amount of money';
    } else if (this.budget.amount > 3000) {
      this.amountTitle = 'EXTREME (WTF)';
      this.amountDescription = 'ARE YOU SURE MAN????';
    } 
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id != null) {
      this.transactionsService.getBudget(+id).subscribe(
        data => this.budget = data
      );

    }
  }
  // llama al metódo de guardado
  callSaveBudget() {
    if (this.budget.title == '' || this.budget.amount == undefined || this.budget.icon == ''){
      this.emptyTaskAlert();
    } else {

      this.budget.fullAmount = this.budget.amount;
      this.transactionsService.saveBudget(this.budget);
      this.router.navigateByUrl('budgets')
    }
   
  }

  // cambia el texto de la cantidad elegida 
  changeAmountDescription() {
    if (this.budget.amount <= 50) {
      this.amountTitle = 'Very low';
      this.amountDescription = 'Oh, you are a poor man :(';
    } else if (this.budget.amount > 50 && this.budget.amount <= 200) {
      this.amountTitle = 'Low';
      this.amountDescription = 'You are being cautious';
    } else if (this.budget.amount > 200 && this.budget.amount <= 800) {
      this.amountTitle = 'Normal';
      this.amountDescription = 'Men, you are going the right way :)';
    } else if (this.budget.amount > 800 && this.budget.amount <= 3000) {
      this.amountTitle = 'High';
      this.amountDescription = 'Careful, this is a laaaarge amount of money';
    } else if (this.budget.amount > 3000) {
      this.amountTitle = 'EXTREME (WTF)';
      this.amountDescription = 'ARE YOU SURE MAN????';
    } 
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

  async balancePopover(ev: any) {
    const popover = await this.popoverController.create({
      component: CheckBalanceComponent,
      cssClass: 'my-custom-class',
      translucent: true,
      event: ev,
      mode: 'ios'
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


}
