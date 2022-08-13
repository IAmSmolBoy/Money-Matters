import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FeedbackComment } from 'src/app/models/comment';
import { Feedback } from 'src/app/models/feedback';
import { User } from 'src/app/models/user';
import { CommentService } from 'src/app/services/comment.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { UserService } from 'src/app/services/user.service';
// import { ObjectId } from 'mongodb';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.css']
})
export class ForumPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private fs: FeedbackService,
    private us: UserService,
    private cs: CommentService,
    private fb: FormBuilder,
    private ua: UserAuthService
  ) { }

  feedbackInfo: Feedback | null = null;
  authorInfo: User | null = null;
  feedbackComments: FeedbackComment[] = [];
  commentUsers: (User | null)[] = []
  currUser: User | null = null

  ngOnInit(): void {
    const feedbackId = this.route.snapshot.paramMap.get("id") ?? "";
    
    this.fs.getFeedbackInfo(feedbackId ?? "").subscribe(feedback => {
      this.feedbackInfo = feedback
      if (this.feedbackInfo) {
        this.us.getUserById(this.feedbackInfo.userId?.toString() ?? "").subscribe(user => {
          this.authorInfo = user
        })
        this.cs.getComments(feedbackId ?? "").subscribe(comments => {
          this.feedbackComments = comments ?? []
          this.feedbackComments.forEach(
            comment => this.us.getUserById(comment?.userId?.toString() ?? "").subscribe(
              user => this.commentUsers.push(user)
            )
          )
        })
      }
    });

    this.ua.currUser.subscribe(user => this.currUser = user)
  }

  commentForm = this.fb.group({
    commentContent: ["", [Validators.required]]
  })

  commentFormSubmit() {
    if (this.currUser && this.feedbackInfo) {
      const newComment = new FeedbackComment(
        this.feedbackInfo._id!.toString(),
        this.commentForm.value.commentContent,
        this.currUser?._id?.toString()
      )
      this.cs.addComment(newComment).subscribe(result => {
        newComment._id = result.insertedId
        this.feedbackComments.push(newComment)
        this.commentUsers.push(this.currUser)
        this.commentForm.reset()
      })
    }
  }

  deleteComment(id: string, i: number) {
    this.cs.deleteComment(id).subscribe(result => {
      console.log(result)
      this.feedbackComments.splice(i, 1)
    })
  }

  //edit
  editedComment: FeedbackComment | null = null
  editComment: FormGroup = this.fb.group({
    content: ["", Validators.required]
  })

  openEditForm(comment: FeedbackComment) {
    this.editedComment = comment
    this.editComment = this.fb.group({
      content: [comment.content, Validators.required]
    })
  }

  saveComment(i: number): void {
    this.cs.updateComment(this.editedComment?._id?.toString() ?? "", {"content": this.editComment.value.content}).subscribe(result => {
      this.feedbackComments.splice(i, 1, result.value)
      this.editedComment = null
    })
  }

}