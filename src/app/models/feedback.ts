import { feedbackList } from "./mock-feedback"

export class Feedback {

    id: number
    subject: string
    description: string
    contactNumber: string
    feedback: boolean
    userId: number

    constructor(id: number, subject: string, description: string, contactNumber: string, feedback: boolean, userId: number) {
        this.id = id
        this.subject = subject 
        this.description = description 
        this.contactNumber = contactNumber
        this.feedback = feedback
        this.userId = userId
    }

}