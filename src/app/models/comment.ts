import { ObjectId } from "mongodb"

export class FeedbackComment {

    _id?: ObjectId
    feedbackId: ObjectId
    userId?: ObjectId
    content: string

    constructor(feedbackId: ObjectId, content: string, userId?: ObjectId, id?: ObjectId) {
        this._id = id
        this.userId = userId
        this.feedbackId = feedbackId
        this.content = content
    }

}