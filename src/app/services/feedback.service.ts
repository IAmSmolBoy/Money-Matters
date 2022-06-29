import { Injectable } from '@angular/core';
import { Feedback } from './models/feedback';
import { feedbackList } from './models/mock-feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor() { }

  getAllFeedbacks = (): Feedback[] => feedbackList

  addFeedback = (newFeedback: Feedback) => feedbackList.push(newFeedback)

  updateFeedback = (oldFeedbackIndex: number, newFeedback: Feedback) => feedbackList[oldFeedbackIndex] = newFeedback

  deleteFeedback = (delFeedbackIndex: number) => feedbackList.splice(delFeedbackIndex, 1)

}
