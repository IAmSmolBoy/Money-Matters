import { ObjectId } from "mongodb"

export class FeedbackComment {

    id: number
    userId: number
    feedbackId: number
    content: string

    constructor(id: number, userId: number, feedbackId: number, content: string) {
        this.id = id
        this.userId = userId
        this.feedbackId = feedbackId
        this.content = content
    }

}