import { transactionList } from "./mock-transaction";

export class Transaction {

    id: number
    userId: number
    category: string
    amount: number
    date: Date
    description?: string

    constructor(userId: number, category: string, amount: number, date: Date, description? : string,) {
        this.id = transactionList.length === 0 ? 1 : transactionList[transactionList.length].id + 1
        this.userId = userId
        this.category = category
        this.amount = amount 
        this.date = date 
        this.description = description
    }

}