import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackComment } from 'src/app/models/comment';
import { Feedback } from 'src/app/models/feedback';
import { User } from 'src/app/models/user';
import { CommentService } from 'src/app/services/comment.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  constructor(private fs: FeedbackService, private cs: CommentService, private us: UserService, private fb: FormBuilder, private ua: UserAuthService) {}

  feedbackList: Feedback[] = []
  signedIn: boolean = false
  forumList: { [title: string]: Feedback[] } = {}
  commentNum: number[][] = [[], []]
  userList: string[][] = [[], []]
  currUser: User | null = null

  form: FormGroup = this.fb.group({
    phoneNumber: [""],
    subject: ["", [Validators.required]],
    description: ["", [Validators.required]],
  })

  ngOnInit(): void {
    this.fs.getAllFeedbacks().subscribe(feedbackList => {
      this.feedbackList = feedbackList

      //filtering feedback and questions
      const feedback = feedbackList.filter(e => e.feedback),
      others = feedbackList.filter(e => !e.feedback)
      this.forumList["General Feedback & Concerns"] = feedback;
      this.forumList["General Questions & Answers"] = others;

      //getting comments
      [feedback, others].forEach((val, i) => val.forEach(
        feedback => this.cs.getComments(feedback?.id?.toString() ?? "").subscribe(
          comments => this.commentNum[i].push(comments?.length ?? 0)
        )
      ))

      //getting feedback usernames
      this.forumList.keys.forEach((element, i) => {
        console.log(element)
      });
      const getUsernames = (section: string, i: number) =>
        this.forumList[section].forEach(
          feedback => this.us.getUserById(feedback?.userId?.toString() ?? "").subscribe(
            user => this.userList[i].push(user?.username ?? "Deleted User")
          )
        )

      getUsernames("General Feedback & Concerns", 0)
      getUsernames("General Questions & Answers", 1)

      this.ua.currUser.subscribe(user => this.currUser = user)
    })
  }

  feedbackSubmit() {
    const formVal = this.form.value
    this.fs.addFeedback(
      new Feedback(
        formVal.subject,
        formVal.description,
        true,
        this.currUser?._id ?? null,
        formVal.phoneNumber,
      )
    )
  }

}
