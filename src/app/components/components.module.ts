import { AddButtonBlackComponent } from './add-button-black/add-button-black.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { NoTransactionsCardComponent } from "./transactions/no-transactions-card/no-transactions-card.component";


@NgModule({
    imports: [IonicModule, CommonModule],
    declarations: [NoTransactionsCardComponent, AddButtonBlackComponent],
    exports: [NoTransactionsCardComponent, AddButtonBlackComponent]
})

export class ComponentsModule{}