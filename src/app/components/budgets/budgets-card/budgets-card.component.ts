import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-budgets-card',
  templateUrl: './budgets-card.component.html',
  styleUrls: ['./budgets-card.component.scss'],
})
export class BudgetsCardComponent implements OnInit {

  @Input() icon: string;
  @Input() title: string;
  @Input() amount: number;
  @Input() fullAmount: number;

  constructor() { }

  ngOnInit() {}

}
