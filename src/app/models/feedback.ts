import { ObjectId } from "mongodb"

export class Feedback {

    id?: ObjectId | null
    subject: string
    description: string
    feedback: boolean
    userId?: ObjectId | null
    contactNumber?: string

    constructor(subject: string, description: string, feedback: boolean, userId: ObjectId | null, contactNumber?: string, id?: ObjectId | null) {
        this.id = id
        this.subject = subject 
        this.description = description 
        this.feedback = feedback
        this.userId = userId
        this.contactNumber = contactNumber
    }

}