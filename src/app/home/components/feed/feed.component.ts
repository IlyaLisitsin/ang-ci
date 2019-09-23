import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { Post } from '../../../shared/models/Post';
import { HomeService } from '../../services/home/home.service';
import { PostComment } from '../../../shared/models/PostComment';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, AfterViewInit {
  @Input() posts: Array<Post>;
  @Input() getFeedPosts: any;
  @Input() isFromAccountDetails: boolean;
  @Input() postToScroll: string;
  @Input() goBackHandle: any;

  @Output() switchAccountDetails = new EventEmitter<string>();

  isFeedView = true;
  isCommentsView = false;
  isLikesView = false;

  loggedUserId: string;
  likesViewState: Array<string>;
  commentsViewState: {
    postId: string;
    postAuthorId: string;
  };

  constructor(
    private elRef: ElementRef,
    private homeService: HomeService,
  ) { }

  ngOnInit() {
    this.loggedUserId = this.homeService.logedUserId;
    this.posts && this.posts.map(post => {
      post.isLikedByLoggedUser = post.likedBy.includes(this.loggedUserId);
      post.isAddCommentInProgress = false;
      return post;
    });
  }

  ngAfterViewInit() {
    this.elRef.nativeElement.querySelector(`#_${this.postToScroll}`)
    && this.elRef.nativeElement.querySelector(`#_${this.postToScroll}`).scrollIntoView({ behavior: 'smooth' });
  }

  backButtonClick() {
    this.goBackHandle();
  }

  loginClick(userId: string) {
    this.switchAccountDetails.emit(userId);
  }

  likeButtonClickHandle(post: Post) {
    const { _id, postAuthorId } = post;
    post.isLikedByLoggedUser = true;
    post.likedBy.push(this.loggedUserId);
      this.homeService.likePost({ postId: _id, postAuthorId }).subscribe(
        null,
        () => {
            post.isLikedByLoggedUser = false;
            post.likedBy = post.likedBy.filter(el => el !== this.loggedUserId);
        }
      );
  }

  unlikeButtonClickHandle(post: Post) {
    const { _id, postAuthorId } = post;

    post.isLikedByLoggedUser = false;
    post.likedBy =
      post.likedBy.filter(el => el !== this.loggedUserId);
    this.homeService.unlikePost({ postId: _id, postAuthorId }).subscribe(
      null,
      () => {
        post.isLikedByLoggedUser = true;
        post.likedBy.push(this.loggedUserId);
      }
    );
  }

  addCommentButtonClick(post: Post, commentText: HTMLTextAreaElement) {
    const { _id, postAuthorId } = post;
    post.isAddCommentInProgress = true;
    this.homeService.addPostComment({
      postAuthorId,
      postId: _id,
      replyTo: null,
      text: commentText.value,
      commentAuthorLogin: this.homeService.loggedUserLogin,
      commentAuthorAvatar: this.homeService.userAvatar,
    })
      .subscribe(
        (newComment: PostComment) => {
          post.comments.push(newComment);
          post.isAddCommentInProgress = false;
          commentText.value = '';
        },
        () => post.isAddCommentInProgress = false,
      );
  }

  likesCounterClick(likedBy: Array<string>) {
    this.isFeedView = false;
    this.isLikesView = true;

    this.likesViewState = likedBy;
  }

  showCommentsClick(comments: Array<PostComment>, postId: string, postAuthorId: string) {
    this.isFeedView = false;
    this.isCommentsView = true;

    this.commentsViewState = { postId, postAuthorId };
  }

  backToFeedView = () => {
    this.isLikesView = false;
    this.isCommentsView = false;
    this.isFeedView = true;

    this.likesViewState = [];
    this.commentsViewState = { postId: '', postAuthorId: '' };
    this.getFeedPosts();
  }

}
