import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  balance: number = 0;

  constructor() { 
    this.getBalanceFromStorage()
      .then(
        data => this.balance = data
      );
  }

  getBalance(): Observable<number> {
    return of(this.balance);
  }

  async saveBalance(amount: number): Promise<boolean> {
    this.balance += amount;
    // if (balance.amount == undefined) {
    //   budget.id = this.budgetCounter++;
    //   this.budgets.push(budget);
    // } else {
    //   this.deleteBudget(budget.id);
    //   this.budgets.push(budget);
    // }

    await this.saveBalanceIntoStorage();

    return true;
  }

  // async deleteBudget(id: number): Promise<boolean> {
  //   this.budgets = this.budgets.filter(t => t.id != id);
  //   return await this.saveBudgetsIntoStorage();
  // }

  async getBalanceFromStorage(): Promise<number> {
    const ret = await Storage.get({ key: 'balance' });
    return JSON.parse(ret.value) ? JSON.parse(ret.value) : 0;
  }

  async saveBalanceIntoStorage(): Promise<boolean> {
    await Storage.set({
      key: 'balance',
      value: JSON.stringify(this.balance),
    });

    return true;
  }

}