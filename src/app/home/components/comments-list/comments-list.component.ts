import { Component, Input, OnInit } from '@angular/core';
import { PostComment } from '../../../shared/models/PostComment';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {
  @Input() commentsList: Array<PostComment>;
  @Input() goBackHandle: any;

  isCommentsListView = true;
  accountDetailsState: string;

  constructor() { }

  ngOnInit() {
  }

  goBack() {
    this.goBackHandle();
  }

  showAccountDetails(accountId: string) {
    this.accountDetailsState = accountId;
    this.isCommentsListView = false;
  }

  goBackToCommentsList = () => {
    this.accountDetailsState = '';
    this.isCommentsListView = true;
  }

}
