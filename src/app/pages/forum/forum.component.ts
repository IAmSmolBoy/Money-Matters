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
  forumList: { [title: string]: Feedback[] } = {}
  commentNum: number[][] = [[], []]
  userList: string[][] = [[], []]
  currUser: User | null = null
  category: boolean = true

  updateForumList(): void {
    //filtering feedback and questions
    const feedback = this.feedbackList.filter(e => e.feedback),
    others = this.feedbackList.filter(e => !e.feedback)
    this.forumList["General Feedback & Concerns"] = feedback;
    this.forumList["General Questions & Answers"] = others;
    
    //getting comments
    [feedback, others].forEach((val, i) => val.forEach(
      feedback => this.cs.getComments(feedback?._id?.toString() ?? "").subscribe(
        comments => this.commentNum[i].push(comments?.length ?? 0)
      )
    ))
  }

  form: FormGroup = this.fb.group({
    phoneNumber: [""],
    subject: ["", [Validators.required]],
    description: ["", [Validators.required]],
  })

  ngOnInit(): void {
    this.fs.getAllFeedbacks().subscribe(feedbackList => {
      console.log(feedbackList);
      this.feedbackList = feedbackList
      
      this.updateForumList();

      //getting feedback usernames
      ["General Feedback & Concerns", "General Questions & Answers"].forEach((section, i) => {
        this.forumList[section].forEach(
          feedback => this.us.getUserById(feedback?.userId?.toString() ?? "").subscribe(
            user => this.userList[i].push(user?.username ?? "Deleted User")
          )
        )
      });
      
      this.ua.currUser.subscribe(user => this.currUser = user)
    })
  }

  feedback: Feedback | null = null

  editForm(feedback: Feedback): void {
    this.form = this.fb.group({
      phoneNumber: [feedback.contactNumber],
      subject: [feedback.subject, [Validators.required]],
      description: [feedback.description, [Validators.required]],
    })
    this.category = feedback.feedback
  }

  deleteFeedback(feedbackId: string) {
    this.fs.deleteFeedback(feedbackId).subscribe(response => {
      this.fs.getAllFeedbacks().subscribe(feedback => {
        this.feedbackList = feedback
        this.updateForumList()
      })
    })
  }

  feedbackSubmit() {
    const formVal = this.form.value,
    feedback = new Feedback(
      formVal.subject,
      formVal.description,
      this.category,
      formVal.phoneNumber,
      this.currUser?._id,
    )
    if (this.feedback !== null) {
      this.fs.updateFeedback(this.feedback._id?.toString() ?? "", feedback).subscribe(response => {
        feedback._id = this.feedback?._id
        this.feedbackList.splice(this.feedbackList.indexOf(this.feedback!), 1, feedback)
        this.updateForumList()
      })
    }
    else {
      this.fs.addFeedback(feedback).subscribe(response => {
        this.feedbackList.push(feedback)
        this.updateForumList()
      })
    }
  }

}
