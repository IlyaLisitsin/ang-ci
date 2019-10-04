import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { mergeMap } from 'rxjs/operators';

import { UserResponse } from '../../../shared/models/UserResponse';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { HomeService } from '../../services/home/home.service';
import { Post } from '../../../shared/models/Post';
import { SpinnerService } from '../../../shared/services/spinner/spinner.service';
import { UploadImageDialogComponent } from '../upload-image-dialog/upload-image-dialog.component';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})

export class AccountDetailsComponent implements OnInit {
  @Input()
  set accountId(id: string) {
    this.isLoggedUser = this.homeService.logedUserId === id;
    this.currentAccountId = id;
  }

  @Input() isBackButtonDisplay: boolean;
  @Input() goBackHandle: any;

  isAccountDetailsView = true;
  isFeedView = false;
  isMessagesView = false;
  isMessagesListView = false;
  isSubscriptionActionInProgress = false;

  isLoggedUser: boolean;
  currentAccountId: string;
  userAvatar: string;
  login: string;
  posts: Array<Post>;
  postToScroll: string;
  subscriptionButtonText: string;

  constructor(
    private authService: AuthService,
    private homeService: HomeService,
    private spinnerService: SpinnerService,
    private dialog: MatDialog,
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
    this.homeService.getUserById(this.currentAccountId)
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
          this.homeService.loggedUserLogin = login;
          this.homeService.userAvatar = userAvatar;
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

  uploadImageClick() {
    const dialogRef = this.dialog.open(UploadImageDialogComponent);
    dialogRef.afterClosed().pipe(
      mergeMap(({ croppedImageFormControl }) => this.homeService.updateUserAvatar({ base64Str: croppedImageFormControl }))
    ).subscribe(
      () => this.getLoggedUser(),
    );
  }

  logout() {
    this.authService.resetUser();
  }

  tileClick(postId: string) {
    this.isFeedView = true;
    this.isAccountDetailsView = false;
    this.postToScroll = postId;
  }

  goBackToAccountDetailsView = () => {
    this.isFeedView = false;
    this.isMessagesView = false;
    this.isMessagesListView = false;
    this.isAccountDetailsView = true;
  }

  accountDetailsBackButtonClick() {
    this.goBackHandle();
  }

  generateSubscriptionButtonText() {
    this.homeService.loggedUserSubscriptions.includes(this.currentAccountId) ?
      this.subscriptionButtonText = 'Unfollow'
      : this.subscriptionButtonText = 'Follow';
  }

  subscriptionButtonClick() {
    if (this.homeService.loggedUserSubscriptions.includes(this.currentAccountId)) {
      this.isSubscriptionActionInProgress = true;
      this.homeService.unfollowUser(this.currentAccountId).subscribe(
      (userResponse: UserResponse) => this.subscribeActionHandler(userResponse),
      () => this.isSubscriptionActionInProgress = false,
      );
    } else {
      this.isSubscriptionActionInProgress = true;
      this.homeService.followUser(this.currentAccountId).subscribe(
        (userResponse: UserResponse) => this.subscribeActionHandler(userResponse),
        () => this.isSubscriptionActionInProgress = false,
      );
    }
  }

  subscribeActionHandler(userResponse: UserResponse) {
    const { user: { subscriptions } } = userResponse;
    this.homeService.loggedUserSubscriptions = subscriptions;
    this.generateSubscriptionButtonText();
    this.isSubscriptionActionInProgress = false;
  }

  showMessagesView() {
    this.isMessagesView = true;
    this.isFeedView = false;
    this.isAccountDetailsView = false;
  }

  showMessagesListView() {
    this.isMessagesListView = true;
    this.isFeedView = false;
    this.isAccountDetailsView = false;
  }
}
