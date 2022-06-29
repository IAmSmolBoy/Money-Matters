import { Injectable } from '@angular/core';
import { transactionList } from '../models/mock-transaction';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor() { }

  getAllTransactions = (): Transaction[] => transactionList

  addTransaction = (newTransaction: Transaction) => transactionList.push(newTransaction)

  updateTransaction = (oldTransactionIndex: number, newTransaction: Transaction) => transactionList[oldTransactionIndex] = newTransaction

  deleteTransaction = (delTransactionIndex: number) => transactionList.splice(delTransactionIndex, 1)

}
