import { feedbackList } from "./mock-feedback"

export class Feedback {

    id: number
    name: string
    email: string
    subject: string
    description: string
    contactNumber: string

    constructor(id: number, name: string, email: string, subject: string, description: string, contactNumber: string) {
        this.id = id
        this.name = name 
        this.email = email 
        this.subject = subject 
        this.description = description 
        this.contactNumber = contactNumber 
    }

}