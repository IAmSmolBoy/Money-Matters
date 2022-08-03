import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedbackComment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  url: string = "/db/comments"

  getAllComments = (): Observable<FeedbackComment[]> => this.http.get<FeedbackComment[]>(this.url)
  getCommentById = (id: string): Observable<FeedbackComment | null> => this.http.get<FeedbackComment | null>(`${this.url}/${id}`)
  getComments = (feedbackId: string): Observable<FeedbackComment[] | null> => this.http.get<FeedbackComment[] | null>(`${this.url}ByFeedback/${feedbackId}`)
  addComment = (newComment: FeedbackComment) => this.http.post(this.url, newComment)
  updateComment = (id: string, newComment: FeedbackComment) => this.http.put(`${this.url}/${id}`, newComment)
  deleteComment = (id: string) => this.http.delete(`${this.url}/${id}`)
  
}