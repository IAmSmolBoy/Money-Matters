import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FeedbackComment } from 'src/app/models/comment';
import { Feedback } from 'src/app/models/feedback';
import { User } from 'src/app/models/user';
import { ReloadService } from 'src/app/services/reload.service';
import { CommentService } from 'src/app/services/comment.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { UserService } from 'src/app/services/user.service';

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
  ) { }

  feedbackId: number = -1;
  feedbackInfo: Feedback | null = null;
  authorInfo: User | null = null;
  feedbackComments: FeedbackComment[] = [];
  commentUsers: (User | null)[] = []

  ngOnInit(): void {
    this.feedbackId = parseInt(this.route.snapshot.paramMap.get("id") || "-1");
    this.feedbackInfo = this.fs.getFeedbackInfo(this.feedbackId);
    if (this.feedbackInfo !== null) {
      this.authorInfo = this.us.getUserById(this.feedbackInfo.userId)
      this.feedbackComments = this.cs.getComments(this.feedbackId)
      this.commentUsers = this.feedbackComments.map(comment => this.us.getUserById(comment.userId))
    }
  }

  commentForm = this.fb.group({
    commentContent: ["", [Validators.required]]
  })

  commentFormSubmit() {
    const newComment = new FeedbackComment(
      this.cs.generateId(),
      1, 
      this.feedbackId,
      this.commentForm.value.commentContent
    )
    this.cs.addComment(newComment)
    this.feedbackComments.push(newComment)
    this.commentUsers.push(this.us.getUserById(1))
    this.commentForm.reset()
  }

}
