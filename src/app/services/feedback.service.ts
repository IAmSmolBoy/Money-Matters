import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback';
import { dictionary } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  url: string = "/db/feedback"

  getAllFeedbacks = (): Observable<Feedback[]> => this.http.get<Feedback[]>(this.url)
  getFeedbackInfo = (id: string): Observable<Feedback | null> => this.http.get<Feedback | null>(`${this.url}/${id}`)
  addFeedback = (newFeedback: Feedback): Observable<dictionary> => this.http.post(this.url, newFeedback)
  updateFeedback = (id: string, newFeedback: Feedback) => this.http.put(`${this.url}/${id}`, newFeedback)
  deleteFeedback = (id: string) => this.http.delete(`${this.url}/${id}`)

}
