import { ObjectId } from "mongodb"

export class Transaction {

    _id?: ObjectId
    userId: string
    category: string
    amount: number
    date: Date
    description?: string

    constructor(userId: string, category: string, amount: number, date: Date, description? : string, id?: ObjectId,) {
        this._id = id
        this.userId = userId
        this.category = category
        this.amount = amount 
        this.date = date 
        this.description = description
    }

}