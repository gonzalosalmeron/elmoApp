import { Component, OnInit } from '@angular/core';
import { BalanceService } from 'src/app/services/balance/balance.service';

@Component({
  selector: 'app-check-balance',
  templateUrl: './check-balance.component.html',
  styleUrls: ['./check-balance.component.scss'],
})
export class CheckBalanceComponent implements OnInit {

  constructor(public balanceService: BalanceService) { }

  ngOnInit() {}

}
