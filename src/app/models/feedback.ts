import { ObjectId } from "mongodb"

export class Feedback {

    _id?: ObjectId
    subject: string
    description: string
    feedback: boolean
    userId?: string
    contactNumber?: string

    constructor(subject: string, description: string, feedback: boolean, contactNumber?: string, userId?: string, id?: ObjectId) {
        this._id = id
        this.subject = subject 
        this.description = description 
        this.feedback = feedback
        this.userId = userId
        this.contactNumber = contactNumber
    }

}