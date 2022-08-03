import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ObjectId } from 'mongodb';
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
    this.us.getUserById(sessionStorage.getItem("userId") ?? "").subscribe(user => this.user = user)
    this.ts.getUserTransactions(this.user?._id?.toString() ?? "").subscribe(transList => this.transactionList = transList)
  }

  //defining variables and assigning it to user data
  user: User | null = null 
  budgetForm: FormGroup = this.fb.group({
    budget: [this.user?.budget ?? 0, [Validators.required, Validators.min(0)]]
  })
  transactionList: Transaction[] = []
  filterFunc = (fn: (value: Transaction) => boolean): Transaction[] => this.transactionList.filter(fn)
  totalFunc = (transList: Transaction[]): number => transList.map(trans => trans.amount).reduce((first: number, second: number) => first + second)
  expenses: number = this.totalFunc(this.filterFunc(trans => trans.amount < 0))
  earnings: number = this.totalFunc(this.filterFunc(trans => trans.amount > 0))
  total: number = this.totalFunc(this.transactionList)

  //functions for budget, setting transaction type and category and delete transaction function
  setTransactionType = (transType: boolean) => this.transactionType = transType
  budgetSubmit(): void {
    if (this.user != null) {
      this.user.budget = this.budgetForm.value.budget
      this.us.updateUser(this.user._id?.toString() ?? "", this.user)
    }
  }
  deleteTransaction = (i: number) => this.ts.deleteTransaction(this.transactionList[i].id?.toString() ?? "")


  //transaction form variables
  transactionType: boolean = true
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
  oldTrans: Transaction | null = null
  transactionAction: string = "Add"

  //transaction form functions
  setCategory = (category: string) => this.category = category
  transactionOnSubmit(): void {
    const formVals = this.transactionForm.value,
    newTransaction = new Transaction(
      this.user!._id!,
      this.category,
      this.transactionType ?
      -formVals.amount :
      formVals.amount,
      new Date(formVals.date),
      formVals.description,
    )
    this.transactionForm.reset()
    this.category = "Pick Your Category"
    if (this.editSelected !== -1 && this.oldTrans != null) {
      newTransaction.id = this.oldTrans.id
      this.ts.updateTransaction(this.oldTrans?.id?.toString() ?? "", newTransaction)
      this.transactionList.splice(this.editSelected, 1, newTransaction)
    }
    else {
      this.ts.addTransaction(newTransaction)
      this.transactionList.push(newTransaction)
    }

    const getTotals = (fn: (trans: Transaction) => boolean) => this.transactionList.filter(fn).map(trans => trans.amount).reduce((total, trans) => total + trans)
    this.expenses = getTotals(trans => trans.amount < 0)
    this.earnings = getTotals(trans => trans.amount > 0)
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
