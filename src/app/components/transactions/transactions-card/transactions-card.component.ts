import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions-card',
  templateUrl: './transactions-card.component.html',
  styleUrls: ['./transactions-card.component.scss'],
})
export class TransactionsCardComponent implements OnInit {

  @Input() icon: string;
  @Input() topic: string;
  @Input() date: Date;
  @Input() amount: number;

  constructor() { }

  ngOnInit() {}

}
