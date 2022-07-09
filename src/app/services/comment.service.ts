import { Injectable } from '@angular/core';
import { FeedbackComment } from '../models/comment';
import { commentList } from '../models/mock-comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor() { }

  generateId = (): number => commentList.length !== 0 ? commentList[commentList.length - 1].id + 1 : 11

  getComments = (feedbackId: number): FeedbackComment[] => commentList.filter(comment => comment.feedbackId === feedbackId)

  getAllComments = (): FeedbackComment[] => commentList

  addComment = (newComment: FeedbackComment) => commentList.push(newComment)

  updateComment = (oldCommentIndex: number, newComment: FeedbackComment) => commentList[oldCommentIndex] = newComment

  deleteComment = (delCommentIndex: number) => commentList.splice(delCommentIndex, 1)

  deleteCommentById = (commentId: number) => commentList.some(comment => comment.id === commentId) ? 
  commentList.splice(
    commentList.indexOf(
      commentList.filter(comment => comment.id === commentId)[0]
    ), 1
  ) : null
}