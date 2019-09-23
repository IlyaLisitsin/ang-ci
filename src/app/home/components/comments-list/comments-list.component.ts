import { Component, Input, OnInit } from '@angular/core';

import { PostComment } from '../../../shared/models/PostComment';
import { HomeService } from '../../services/home/home.service';
import { SpinnerService } from '../../../shared/services/spinner/spinner.service';

interface CommentsResponse {
  id: string;
  comments: Array<PostComment>;
}

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {
  @Input() commentsViewState: {
    postId: string;
    postAuthorId: string;
  };
  @Input() goBackHandle: any;

  commentsList: Array<PostComment>;

  isCommentsListView = true;
  isLikesView = false;

  accountDetailsState: string;
  loggedUserId: string;
  likesViewState: Array<string>;

  constructor(
    private homeService: HomeService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit() {
    this.loggedUserId = this.homeService.logedUserId;
    this.commentsViewState && this.getComments();
  }

  getComments() {
    this.spinnerService.showSpinner();
    this.homeService.getComments({
      postId: this.commentsViewState.postId,
      postAuthorId: this.commentsViewState.postAuthorId
    }).subscribe(
      (commentsResponse: CommentsResponse) => {
        this.commentsList = commentsResponse.comments.map(comment => {
          comment.isLikedByLoggedUser = comment.likedBy.includes(this.loggedUserId);
          return comment;
        });
        this.spinnerService.hideSpinner();
      },
      () => this.spinnerService.hideSpinner(),
    );
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
    this.isLikesView = false;

    this.likesViewState = [];
    this.getComments();
  }

  likesCounterClick(likesCollection: Array<string>) {
    this.isLikesView = true;
    this.isCommentsListView = false;

    this.likesViewState = likesCollection;
  }

  likeButtonClickHandle(comment: PostComment) {
    const { _id, commentAuthorId } = comment;
    comment.isLikedByLoggedUser = true;
    comment.likedBy.push(this.loggedUserId);
    this.homeService.likePostComment({
      postCommentId: _id,
      postId: this.commentsViewState.postId,
      postAuthorId: this.commentsViewState.postAuthorId,
      postCommentAuthorId: commentAuthorId,
    })
      .subscribe(
      null,
      () => {
        comment.isLikedByLoggedUser = false;
        comment.likedBy = comment.likedBy.filter(el => el !== this.loggedUserId);
      }
    );
  }

  unlikeButtonClickHandle(comment: PostComment) {
    const { _id, commentAuthorId } = comment;

    comment.isLikedByLoggedUser = false;
    comment.likedBy =
      comment.likedBy.filter(el => el !== this.loggedUserId);
    this.homeService.unlikePostComment({
      postCommentId: _id,
      postId: this.commentsViewState.postId,
      postAuthorId: this.commentsViewState.postAuthorId,
      postCommentAuthorId: commentAuthorId,
    })
      .subscribe(
      null,
      () => {
        comment.isLikedByLoggedUser = true;
        comment.likedBy.push(this.loggedUserId);
      }
    );
  }

}
