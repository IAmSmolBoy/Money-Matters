import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackComment } from 'src/app/models/comment';
import { Feedback } from 'src/app/models/feedback';
import { User } from 'src/app/models/user';
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
    private cs: CommentService
  ) { }

  feedbackId: number = -1;
  feedbackInfo: Feedback | null = null;
  authorInfo: User | null = null;
  feedbackComments: FeedbackComment[] = [];
  commentUsers: User[] = []

  ngOnInit(): void {
    this.feedbackId = parseInt(this.route.snapshot.paramMap.get("id") || "-1");
    this.feedbackInfo = this.fs.getFeedbackInfo(this.feedbackId);
    if (this.feedbackInfo !== null) {
      this.authorInfo = this.us.getUser(this.feedbackInfo.userId)
      this.feedbackComments = this.cs.getComments(this.feedbackId)
      this.commentUsers = this.feedbackComments.map(comment => this.us.getUser(comment.userId))
    }
  }

}
