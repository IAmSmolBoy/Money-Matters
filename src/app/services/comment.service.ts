import { Injectable } from '@angular/core';
import { FeedbackComment } from '../models/comment';
import { commentList } from '../models/mock-comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor() { }

  getComments = (feedbackId: number): FeedbackComment[] => !commentList.some(comment => comment.feedbackId === feedbackId) ? [] :
  commentList.filter(comment => comment.feedbackId === feedbackId)

  getAllComments = (): FeedbackComment[] => commentList

  addComment = (newComment: FeedbackComment) => commentList.push(newComment)

  updateComment = (oldCommentIndex: number, newComment: FeedbackComment) => commentList[oldCommentIndex] = newComment

  deleteComment = (delCommentIndex: number) => commentList.splice(delCommentIndex, 1)
}
