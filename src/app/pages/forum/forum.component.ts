import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  constructor(private fs: FeedbackService) {}

  ngOnInit(): void {}

  forumList: {
    "General Questions & Answers": Feedback[],
    "General Feedback & Concerns": Feedback[]
  } = {
    "General Questions & Answers": this.fs.getAllFeedbacks().filter(e => e.feedback === true),
    "General Feedback & Concerns": this.fs.getAllFeedbacks().filter(e => e.feedback === false)
  }

}
