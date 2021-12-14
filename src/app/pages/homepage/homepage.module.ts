import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomepagePageRoutingModule } from './homepage-routing.module';

import { HomepagePage } from './homepage.page';
import { TransactionModalComponent } from 'src/app/components/transactions/transaction-modal/transaction-modal.component';
import { TransactionsCardComponent } from 'src/app/components/transactions/transactions-card/transactions-card.component';
import { FooterToolbarComponent } from 'src/app/components/footer-toolbar/footer-toolbar.component';
import { AddButtonComponent } from 'src/app/components/add-button/add-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomepagePageRoutingModule,
    ComponentsModule
  ],
  declarations: [HomepagePage, TransactionModalComponent, TransactionsCardComponent, FooterToolbarComponent, AddButtonComponent]
})
export class HomepagePageModule {}
