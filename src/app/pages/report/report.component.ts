import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { transactionList } from 'src/app/models/mock-transaction';
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
    console.log(this.today.toDateString())
  }

  //defining variables and assigning it to user data
  user: User = this.us.getUserById(parseInt(sessionStorage.getItem("userId")!))!
  budgetForm: FormGroup = this.fb.group({
    budget: [this.user.budget, [Validators.required, Validators.min(0)]]
  })
  mapFunc = (trans: Transaction) => trans.amount
  sum = (first: number, second: number) => first + second
  expenses: number = transactionList.filter(trans => trans.amount < 0).map(this.mapFunc).reduce(this.sum)
  earnings: number = transactionList.filter(trans => trans.amount > 0).map(this.mapFunc).reduce(this.sum)
  total: number = transactionList.map(this.mapFunc).reduce(this.sum)

  //functions for budget, setting transaction type and category and delete transaction function
  setTransactionType = (transType: boolean) => this.transactionType = transType
  budgetSubmit(): void {
    const userIndex = this.us.getAllUsers().indexOf(this.user)
    this.user.budget = this.budgetForm.value.budget
    this.us.updateUser(userIndex, this.user)
  }
  deleteTransaction = (i: number) => this.ts.deleteTransaction(this.ts.getAllTransactions().indexOf(this.transactionList.splice(i, 1)[0]))


  //transaction form variables
  transactionType: boolean = true
  transactionList: Transaction[] = this.ts.getUserTransactions(this.user.id)
  categoryList: { [key: string]: string[] } = {
    Earnt: [
      "Salary",
      "Investments(Earnt)",
      "Other(Earnt)",
    ],
    Expense: [
      "School",
      "F&B",
      "Transport",
      "Entertainment",
      "Medical",
      "Investments(Expense)",
      "Other(Expense)",
    ]
  }
  category: string = "Pick Your Category"
  today: Date = new Date()
  transactionForm: FormGroup = this.fb.group({
    amount: ["", [Validators.required, Validators.min(0)]],
    date: ["", [Validators.required]],
    description: [""],
  })
  editSelected: number = -1
  oldTrans: Transaction = new Transaction(-1, -1, "", 0, new Date())
  transactionAction: string = "Add"

  //transaction form functions
  setCategory = (category: string) => this.category = category
  transactionOnSubmit(): void {
    const formVals = this.transactionForm.value,
    newTransaction = new Transaction(
      this.ts.generateId(),
      this.user.id,
      this.category,
      this.transactionType ?
      -formVals.amount :
      formVals.amount,
      new Date(formVals.date),
      formVals.description
    )
    this.transactionForm.reset()
    this.category = "Pick Your Category"
    if (this.editSelected !== -1) {
      newTransaction.id = this.oldTrans.id
      this.ts.updateTransaction(this.ts.getAllTransactions().indexOf(this.oldTrans), newTransaction)
      this.transactionList.splice(this.editSelected, 1, newTransaction)
      console.log(this.ts.getAllTransactions())
    }
    else {
      this.ts.addTransaction(newTransaction)
      this.transactionList.push(newTransaction)
    }
    this.expenses = transactionList.filter(trans => trans.amount < 0).map(trans => trans.amount).reduce((total, trans) => total + trans)
    this.earnings = transactionList.filter(trans => trans.amount > 0).map(trans => trans.amount).reduce((total, trans) => total + trans)
  }
  editTransaction(i: number): void {
    const datePipe = new DatePipe("en-SG")
    this.oldTrans = this.transactionList[i]
    this.editSelected = this.editSelected === i ? -1 : i
    this.transactionAction = this.editSelected === i ? "Edit" : "Add"
    this.transactionType = this.editSelected === i ? this.oldTrans.amount < 0 : this.transactionType
    this.category = this.editSelected === i ? this.oldTrans.category : "Pick Your Category"
    this.transactionForm = this.editSelected === i ? this.fb.group({
      amount: [Math.abs(this.oldTrans.amount), [Validators.required, Validators.min(0)]],
      date: [datePipe.transform(this.oldTrans.date, "yyyy-MM-dd"), [Validators.required]],
      description: [this.oldTrans.description],
    }) :
    this.fb.group({
      amount: ["", [Validators.required, Validators.min(0)]],
      date: ["", [Validators.required]],
      description: [""],
    })
  }

}
