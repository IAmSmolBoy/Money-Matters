import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackComment } from 'src/app/models/comment';
import { Feedback } from 'src/app/models/feedback';
import { User } from 'src/app/models/user';
import { CommentService } from 'src/app/services/comment.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  constructor(private fs: FeedbackService, private cs: CommentService, private us: UserService, private fb: FormBuilder) {}

  form: FormGroup = this.fb.group({
    phoneNumber: [""],
    subject: ["", [Validators.required]],
    description: ["", [Validators.required]],
  })

  ngOnInit(): void {}

  signedIn: boolean = sessionStorage.getItem("userId") !== null

  forumList: { [title: string]: Feedback[] } = {
    "General Feedback & Concerns": this.fs.getAllFeedbacks().filter(e => e.feedback === true),
    "General Questions & Answers": this.fs.getAllFeedbacks().filter(e => e.feedback === false)
  }

  commentNum: number[][] = [
    this.forumList["General Feedback & Concerns"].map(feedback => this.cs.getComments(feedback.id).length),
    this.forumList["General Questions & Answers"].map(feedback => this.cs.getComments(feedback.id).length),
  ]

  getUsernames = (section: string) => this.forumList[section]
    .map(feedback => this.us.getUserById(feedback.userId) ?
    this.us.getUserById(feedback.userId)!.username :
    "Deleted User"
  )

  userList: string[][] = [
    this.getUsernames("General Feedback & Concerns"),
    this.getUsernames("General Questions & Answers"),
  ]

  feedbackSubmit() {
    const formVal = this.form.value,
    feedbacks = this.fs.getAllFeedbacks()
    this.fs.addFeedback(
      new Feedback(
        feedbacks.length == 0 ? 1 : feedbacks[feedbacks.length - 1].id + 1,
        formVal.subject,
        formVal.description,
        true,
        parseInt(sessionStorage.getItem("userId") || "1"),
        formVal.phoneNumber
      )
    )
    console.log(this.fs.getAllFeedbacks())
  }


}
