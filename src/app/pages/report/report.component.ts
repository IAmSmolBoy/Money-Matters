import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private ts: TransactionService) { }

  userId: number = parseInt(sessionStorage.getItem("userId") || "-1")

  ngOnInit(): void {
  }

  transactionList: Transaction[] = this.ts.getUserTransactions(this.userId)

}
