import { Component, Input, OnInit } from '@angular/core';

import { PostComment } from '../../../shared/models/PostComment';
import {HomeService} from "../../services/home/home.service";

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {
  @Input() commentsViewState: {
    likedBy: Array<PostComment>;
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
  ) { }

  ngOnInit() {
    this.loggedUserId = this.homeService.logedUserId;
    this.commentsList = this.commentsViewState.likedBy.map(comment => {
      comment.isLikedByLoggedUser = comment.likedBy.includes(this.loggedUserId);
      return comment;
    })
  }

  getComments() {
    this.homeService.getComments().subscribe(
      (commentsList: Array<PostComment>) => this.commentsList = commentsList.map(comment => {
        comment.isLikedByLoggedUser = comment.likedBy.includes(this.loggedUserId);
        return comment;
      })
    )
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
    // this.getComments();
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
