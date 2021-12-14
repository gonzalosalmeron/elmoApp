import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetsPageRoutingModule } from './budgets-routing.module';

import { BudgetsPage } from './budgets.page';
import { BudgetsCardComponent } from 'src/app/components/budgets/budgets-card/budgets-card.component';
import { NoBudgetsCardComponent } from 'src/app/components/budgets/no-budgets-card/no-budgets-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [BudgetsPage, BudgetsCardComponent, NoBudgetsCardComponent]
})
export class BudgetsPageModule {}
