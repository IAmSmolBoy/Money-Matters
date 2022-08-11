import { ObjectId } from "mongodb"

export class FeedbackComment {

    _id?: ObjectId
    feedbackId: string
    userId?: string
    content: string

    constructor(feedbackId: string, content: string, userId?: string, id?: ObjectId) {
        this._id = id
        this.userId = userId
        this.feedbackId = feedbackId
        this.content = content
    }

}