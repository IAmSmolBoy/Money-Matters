import { ObjectId } from "mongodb"

export class Feedback {

    id: number
    subject: string
    description: string
    feedback: boolean
    userId: number
    contactNumber?: string

    constructor(id: number, subject: string, description: string, feedback: boolean, userId: number, contactNumber?: string) {
        this.id = id
        this.subject = subject 
        this.description = description 
        this.feedback = feedback
        this.userId = userId
        this.contactNumber = contactNumber
    }

}