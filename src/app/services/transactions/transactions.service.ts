import { Injectable } from '@angular/core';

import { Storage } from '@capacitor/storage';
import { Observable, of } from 'rxjs';
import * as moment from 'moment';
import { Transaction } from 'src/app/model/transaction/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  transactions: Transaction[] = [];

  transactionCounter: number = 0;

  constructor() { 
    this.getTransactionsFromStorage()
      .then(
        data => this.transactions = data
      );

    this.getTransactionCounterFromStorage()
      .then(
        data => this.transactionCounter = data
      );
  }

  getTransactions(): Observable<Transaction[]> {
    return of(this.transactions.sort((a,b) => moment(a.date).valueOf() - moment(b.date).valueOf()).reverse());
  }

  get5LastTransactions(): Observable<Transaction[]> {
    return of(this.transactions.sort((a,b) => moment(a.date).valueOf() - moment(b.date).valueOf()).slice(Math.max(this.transactions.length - 5, 0)).reverse());
  }

  getTransactionsLenght() {
    return this.transactions.length;
  }

  getTransaction(id: number): Observable<Transaction> {
    const transaction = this.transactions.filter(t => t.id === id)[0];
    const newTransaction = Object.assign({}, transaction);
    return of(newTransaction);
    //return of({...this.transactions.filter(t => t.id === id)[0]});
  }

  async saveTransaction(transaction: Transaction): Promise<boolean> {
    if (transaction.id == undefined) {
      if (transaction.icon == '') {
        transaction.icon = 'help-circle-outline';
      }
      transaction.id = this.transactionCounter++;
      transaction.month = moment(transaction.date).format('MMMM');
      transaction.day = moment(transaction.date).format('DD');
      transaction.year = moment(transaction.date).year();
      this.transactions.push(transaction);
    } else {
      this.deleteTransaction(transaction.id);
      this.transactions.push(transaction);
    }

    await this.saveTransactionsIntoStorage();
    await this.saveTransactionCounterIntoStorage();

    return true;
  }

  async deleteTransaction(id: number): Promise<boolean> {
    this.transactions = this.transactions.filter(t => t.id != id);
    return await this.saveTransactionsIntoStorage();
  }

  async getTransactionsFromStorage(): Promise<Transaction[]> {
    const ret = await Storage.get({ key: 'transactions' });
    return JSON.parse(ret.value) ? JSON.parse(ret.value) : [];
  }

  async getTransactionCounterFromStorage(): Promise<number> {
    const tc = await Storage.get({ key: 'transactionCounter' });
    console.log("transactionCounter: " + JSON.stringify(tc.value));
    return Number.isInteger(+tc.value) ? +tc.value : 0;
  }

  async saveTransactionsIntoStorage(): Promise<boolean> {
    await Storage.set({
      key: 'transactions',
      value: JSON.stringify(this.transactions),
    });

    return true;
  }

  async saveTransactionCounterIntoStorage(): Promise<boolean> {
    await Storage.set({
      key: 'transactionCounter',
      value: '' + this.transactionCounter,
    });

    return true;
  }
}