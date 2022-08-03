import { ObjectId } from "mongodb"

export class FeedbackComment {

    id?: ObjectId | null
    feedbackId: ObjectId
    userId?: ObjectId | null
    content: string

    constructor(feedbackId: ObjectId, content: string, userId?: ObjectId | null, id?: ObjectId | null) {
        this.id = id
        this.userId = userId
        this.feedbackId = feedbackId
        this.content = content
    }

}