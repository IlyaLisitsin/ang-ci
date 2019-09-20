import {
  AfterViewInit,
  Component, ComponentRef,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output, ViewChild,
} from '@angular/core';

import { Post } from '../../../shared/models/Post';
import { HomeService } from '../../services/home/home.service';
import { LikesListComponent } from '../likes-list/likes-list.component';
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

  @ViewChild('likesList') likesList: ComponentRef<LikesListComponent>;

  @Output() switchAccountDetails = new EventEmitter<string>();

  isFeedView = true;
  isCommentsView = false;
  isLikesView = false;

  loggedUserId: string;
  likesViewState: Array<string>;
  likesGoBackHandle: any;

  commentsViewState: Array<PostComment>;

  constructor(
    private elRef: ElementRef,
    private homeService: HomeService,
  ) { }

  ngOnInit() {
    this.loggedUserId = this.homeService.logedUserId;
    this.posts && this.posts.map(post => {
      post.isLikedByLoggedUser = post.likedBy.includes(this.loggedUserId);
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

  likeButtonClickHandle(postId: string, postAuthorId: string) {
    this.posts.find(post => post._id === postId).isLikedByLoggedUser = true;
    this.posts.find(post => post._id === postId).likedBy.push(this.loggedUserId);
    this.homeService.likePost({ postId, postAuthorId }).subscribe(
      null,
      () => {
        this.posts.find(post => post._id === postId).isLikedByLoggedUser = false;
        this.posts.find(post => post._id === postId).likedBy =
          this.posts.find(post => post._id === postId).likedBy.filter(el => el !== this.loggedUserId);
      }
    );
  }

  unlikeButtonClickHandle(postId: string, postAuthorId: string) {
    this.posts.find(post => post._id === postId).isLikedByLoggedUser = false;
    this.posts.find(post => post._id === postId).likedBy =
      this.posts.find(post => post._id === postId).likedBy.filter(el => el !== this.loggedUserId);
    this.homeService.unlikePost({ postId, postAuthorId }).subscribe(
      null,
      () => {
        this.posts.find(post => post._id === postId).isLikedByLoggedUser = true;
        this.posts.find(post => post._id === postId).likedBy.push(this.loggedUserId);
      }
    );
  }

  showCommentsClick() {
    this.isCommentsView = true;
  }

  addCommentButtonClick(postId: string, text: string, postAuthorId: string, commentAuthorLogin: string) {
    this.homeService.addPostComment({ postId, text, postAuthorId, replyTo: null, commentAuthorLogin })
      .subscribe();
  }

  likesCounterClick(likedBy: Array<string>) {
    this.isFeedView = false;
    this.isLikesView = true;

    this.likesViewState = likedBy;
    this.likesGoBackHandle = () => this.backToFeedView;
  }

  commentsCounterClick(comments: Array<PostComment>) {
    this.isFeedView = false;
    this.isCommentsView = true;

    this.commentsViewState = comments;
  }

  backToFeedView = () => {
    this.isLikesView = false;
    this.isFeedView = true;

    this.likesViewState = [];
    this.getFeedPosts();
  }

}
