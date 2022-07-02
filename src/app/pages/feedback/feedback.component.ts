import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from 'src/app/models/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  form: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phoneNumber: [""],
      subject: ["", [Validators.required]],
      description: ["", [Validators.required]],
    })
  }

  feedbackSubmit() {
    const formVal = this.form.value,
    feedbacks = this.feedbackService.getAllFeedbacks()
    this.feedbackService.addFeedback(
      new Feedback(
        feedbacks.length == 0 ? 1 : feedbacks[feedbacks.length - 1].id + 1,
        formVal.name,
        formVal.email,
        formVal.subject,
        formVal.description,
        formVal.phoneNumber
      )
    )
    console.log(this.feedbackService.getAllFeedbacks())
  }

}
