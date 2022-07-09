import { Injectable } from '@angular/core';
import { transactionList } from '../models/mock-transaction';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor() { }

  generateId = (): number => transactionList.length !== 0 ? transactionList[transactionList.length - 1].id + 1 : 0

  getAllTransactions = (): Transaction[] => transactionList

  getUserTransactions = (userId: number): Transaction[] => transactionList.filter(trans => trans.userId === userId)

  addTransaction = (newTransaction: Transaction) => transactionList.push(newTransaction)

  updateTransaction = (oldTransactionIndex: number, newTransaction: Transaction) => transactionList[oldTransactionIndex] = newTransaction

  deleteTransaction = (delTransactionIndex: number) => transactionList.splice(delTransactionIndex, 1)

}
