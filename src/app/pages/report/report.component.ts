import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ObjectId } from 'mongodb';
import { Transaction } from 'src/app/models/transaction';
import { User } from 'src/app/models/user';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private ts: TransactionService, private us: UserService, private ua: UserAuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.today.toDateString())
    this.ua.currUser.subscribe(user => {
      this.user = user
      if (user !== null) {
        this.budgetForm = this.fb.group({
          budget: [this.user?.budget ?? 0, [Validators.required, Validators.min(0)]]
        })
        this.ts.getUserTransactions(this.user?._id?.toString() ?? "").subscribe(transList => {
          this.transactionList = transList.map(trans => {
            const newTrans = trans
            newTrans.date = new Date(newTrans.date)
            return newTrans
          })
          console.log(transList)
          this.getTotals()
        })
      }
    })
  }

  //defining variables and assigning it to user data
  user: User | null = null 
  budgetForm: FormGroup = this.fb.group({
    budget: [this.user?.budget ?? 0, [Validators.required, Validators.min(0)]]
  })
  transactionList: Transaction[] = []
  expenses: number = 0
  earnings: number = 0
  total: number = 0

  //functions for budget, setting transaction type and category and delete transaction function
  setTransactionType = (transType: boolean) => this.transactionType = transType
  budgetSubmit(): void {
    if (this.user != null) {
      this.user.budget = this.budgetForm.value.budget
      this.us.updateUser(this.user._id?.toString() ?? "", {"budget":  this.budgetForm.value.budget}).subscribe(result => console.log(result))
    }
  }
  deleteTransaction = (i: number) => this.ts.deleteTransaction(this.transactionList[i]._id?.toString() ?? "").subscribe(response => {
    this.transactionList.splice(i, 1)
    this.getTotals()
  })


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

  getTotals(): void {
    console.log("a");
    
    //filter and reduce functions
    const filterFunc = (fn: (value: Transaction) => boolean): Transaction[] => this.transactionList.filter(fn)
    const totalFunc = (transList: Transaction[]): number => transList.length > 0 ?
    transList.map(trans => trans.amount).reduce((first: number, second: number) => first + second) :
    0

    this.expenses = totalFunc(filterFunc(trans => trans.amount < 0))
    this.earnings = totalFunc(filterFunc(trans => trans.amount > 0))
    this.total = totalFunc(this.transactionList)
  }

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
    console.log(newTransaction)
    this.transactionForm.reset()
    this.category = "Pick Your Category"
    if (this.editSelected !== -1 && this.oldTrans != null) {
      newTransaction._id = this.oldTrans._id
      this.ts.updateTransaction(this.oldTrans?._id?.toString() ?? "", newTransaction).subscribe(result => console.log(result))
      this.transactionList.splice(this.editSelected, 1, newTransaction)
    }
    else {
      this.ts.addTransaction(newTransaction).subscribe((result: any) => {
        console.log(result)
        newTransaction._id = result["insertedId"] ?? ""
      })
      this.transactionList.push(newTransaction)
    }
    this.getTotals()
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
    this.getTotals()
  }

}
