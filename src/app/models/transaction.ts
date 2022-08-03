import { ObjectId } from "mongodb"

export class Transaction {

    id?: ObjectId | null
    userId: ObjectId | null
    category: string
    amount: number
    date: Date
    description?: string

    constructor(userId: ObjectId | null, category: string, amount: number, date: Date, description? : string, id?: ObjectId | null,) {
        this.id = id
        this.userId = userId
        this.category = category
        this.amount = amount 
        this.date = date 
        this.description = description
    }

}