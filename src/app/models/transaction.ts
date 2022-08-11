import { ObjectId } from "mongodb"

export class Transaction {

    _id?: ObjectId
    userId: ObjectId
    category: string
    amount: number
    date: Date
    description?: string

    constructor(userId: ObjectId, category: string, amount: number, date: Date, description? : string, id?: ObjectId,) {
        this._id = id
        this.userId = userId
        this.category = category
        this.amount = amount 
        this.date = date 
        this.description = description
    }

}