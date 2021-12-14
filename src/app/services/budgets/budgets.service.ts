
import { Injectable } from '@angular/core';

import { Storage } from '@capacitor/storage';
import { Observable, of } from 'rxjs';
import { Budget } from 'src/app/model/budget/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetsService {

  budgets: Budget[] = [];

  budgetCounter: number = 0;

  constructor() { 
    this.getBudgetsFromStorage()
      .then(
        data => this.budgets = data
      );

    this.getBudgetCounterFromStorage()
      .then(
        data => this.budgetCounter = data
      );
  }

  getBudgets(): Observable<Budget[]> {
    return of(this.budgets);
  }

  getBudgetsLenght() {
    return this.budgets.length;
  }

  getBudget(id: number): Observable<Budget> {
    const budget = this.budgets.filter(b => b.id === id)[0];
    const newBudget = Object.assign({}, budget);
    return of(newBudget);
    
  }

  getBudgetByType(type: string): Observable<Budget> {
    const budget = this.budgets.filter(b => b.title == type)[0];
    const newBudget = Object.assign({}, budget);
    return of(newBudget);
    
  }

  async saveBudget(budget: Budget): Promise<boolean> {
    if (budget.id == undefined) {
      budget.id = this.budgetCounter++;
      this.budgets.push(budget);
    } else {
      this.deleteBudget(budget.id);
      this.budgets.push(budget);
    }

    await this.saveBudgetsIntoStorage();
    await this.saveBudgetCounterIntoStorage();

    return true;
  }

  async deleteBudget(id: number): Promise<boolean> {
    this.budgets = this.budgets.filter(t => t.id != id);
    return await this.saveBudgetsIntoStorage();
  }

  async getBudgetsFromStorage(): Promise<Budget[]> {
    const ret = await Storage.get({ key: 'budgets' });
    return JSON.parse(ret.value) ? JSON.parse(ret.value) : [];
  }

  async getBudgetCounterFromStorage(): Promise<number> {
    const tc = await Storage.get({ key: 'budgetCounter' });
    console.log("budgetCounter: " + JSON.stringify(tc.value));
    return Number.isInteger(+tc.value) ? +tc.value : 0;
  }

  async saveBudgetsIntoStorage(): Promise<boolean> {
    await Storage.set({
      key: 'budgets',
      value: JSON.stringify(this.budgets),
    });

    return true;
  }

  async saveBudgetCounterIntoStorage(): Promise<boolean> {
    await Storage.set({
      key: 'budgetCounter',
      value: '' + this.budgetCounter,
    });

    return true;
  }
}
