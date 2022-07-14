import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from 'src/app/models/transaction';
import { User } from 'src/app/models/user';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private ts: TransactionService, private us: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  //defining variables and assigning it to user data
  user: User = this.us.getUserById(parseInt(sessionStorage.getItem("userId")!))!
  transactionType: boolean = true
  categoryList: string[] = [
    "None",
    "Salary",
    "Investments(Earnt)",
    "Other(Earnt)",
    "School",
    "F&B",
    "Transport",
    "Entertainment",
    "Medical",
    "Investments(Expense)",
    "Other(Expense)",
  ]
  transactionList: Transaction[] = this.ts.getUserTransactions(this.user.id)
  budgetForm: FormGroup = this.fb.group({
    budget: [this.user.budget, [Validators.required, Validators.min(0)]]
  })


  //functions for forms and setting transaction type
  setTransactionType = (transType: boolean) => this.transactionType = transType
  budgetSubmit(): void {
    const userIndex = this.us.getAllUsers().indexOf(this.user)
    this.user.budget = this.budgetForm.value.budget
    this.us.updateUser(userIndex, this.user)
    console.log(this.us.getAllUsers())
  }

}
