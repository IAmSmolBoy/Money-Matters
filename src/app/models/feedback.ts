import { feedbackList } from "./mock-feedback"

export class Feedback {

    id: number
    name: string
    email: string
    subject: string
    description: string
    contactNumber?: string

    constructor(name: string, email: string, subject: string, description: string, contactNumber?: string) {
        this.id = feedbackList.length === 0 ? 1 : feedbackList[feedbackList.length - 1].id + 1
        this.name = name 
        this.email = email 
        this.subject = subject 
        this.description = description 
        this.contactNumber = contactNumber 
    }

}