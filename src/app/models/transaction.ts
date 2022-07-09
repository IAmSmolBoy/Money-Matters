import { transactionList } from "./mock-transaction";

export class Transaction {

    id: number
    userId: number
    category: string
    amount: number
    date: Date
    description?: string

    constructor(id: number, userId: number, category: string, amount: number, date: Date, description? : string,) {
        this.id = id
        this.userId = userId
        this.category = category
        this.amount = amount 
        this.date = date 
        this.description = description
    }

}