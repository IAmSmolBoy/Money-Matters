import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dictionary } from '../models/interfaces';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  url: string = "/db/transactions"

  getAllTransactions = (): Observable<Transaction[]> => this.http.get<Transaction[]>(this.url)
  getUserTransactions = (userId: string): Observable<Transaction[]> => this.http.get<Transaction[]>(`${this.url}ByUserId/${userId}`)
  addTransaction = (newTransaction: Transaction): Observable<dictionary> => this.http.post(this.url, newTransaction)
  updateTransaction = (id: string, newTransaction: Transaction) => this.http.put(`${this.url}/${id}`, newTransaction)
  deleteTransaction = (id: string) => this.http.delete(`${this.url}/${id}`)

}