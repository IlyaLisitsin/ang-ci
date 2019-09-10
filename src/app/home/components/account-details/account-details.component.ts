import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { UserResponse } from '../../../shared/models/UserResponse';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { HomeService } from '../../services/home/home.service';
import { Post } from '../../../shared/models/Post';
import { SpinnerService } from '../../../shared/services/spinner/spinner.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})

export class AccountDetailsComponent implements OnInit {
  @Input() isLoggedUser: boolean;
  @Input() accountId: string;
  @Input() isFromMainFeed: boolean;
  @Input() isFromSearch: boolean;

  @Output() goBackToFeedView = new EventEmitter();
  @Output() goBackToSearchView = new EventEmitter();

  isFeedView = false;
  userAvatar: string;
  login: string;
  posts: Array<Post>;
  postToScroll: string;
  subscriptionButtonText: string;

  constructor(
    private authService: AuthService,
    private homeService: HomeService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit() {
    this.generateSubscriptionButtonText();
    if (this.isLoggedUser) {
      this.getLoggedUser();
    } else {
      this.getUserById();
    }
  }

  getUserById() {
    this.spinnerService.showSpinner();
    this.homeService.getUserById(this.accountId)
      .subscribe(
        ({ user: { userAvatar, login, posts } }: UserResponse) => this.userResponseHandler({ userAvatar, login, posts }),
        () => this.spinnerService.hideSpinner(),
      );
  }

  getLoggedUser() {
    this.spinnerService.showSpinner();
    this.homeService.getLoggedUser()
      .subscribe(
        ({ user: { userAvatar, login, posts, _id, subscriptions } }: UserResponse) => {
          this.userResponseHandler({ userAvatar, login, posts });
          this.homeService.logedUserId = _id;
          this.homeService.loggedUserSubscriptions = subscriptions;
        },
        () => this.spinnerService.hideSpinner(),
      );
  }

  userResponseHandler({ userAvatar, login, posts }) {
    this.userAvatar = userAvatar;
    this.login = `@${login}`;
    this.spinnerService.hideSpinner();
    this.posts = posts;
  }

  updateAvatar() {
    this.getLoggedUser();
  }

  logout() {
    this.authService.resetUser();
  }

  tileClick(postId: string) {
    this.isFeedView = true;
    this.postToScroll = postId;
  }

  goBackToAccountDetailsView() {
    this.isFeedView = false;
  }

  accountDetailsBackButtonClick() {
    this.isFromMainFeed && this.goBackToFeedView.emit();
    this.isFromSearch && this.goBackToSearchView.emit();
  }

  generateSubscriptionButtonText() {
    this.homeService.loggedUserSubscriptions.includes(this.accountId) ?
      this.subscriptionButtonText = 'Unfollow'
      : this.subscriptionButtonText = 'Follow';
  }

  subscriptionButtonClick() {
    this.homeService.loggedUserSubscriptions.includes(this.accountId) ?
      console.log('unfollow action')
      : console.log('follow action');
  }
}
