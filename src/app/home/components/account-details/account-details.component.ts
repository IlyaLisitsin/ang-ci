import { Component, Input, OnInit } from '@angular/core';

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

  isFeedView = false;
  userAvatar: string;
  login: string;
  posts: Array<Post>;
  postToScroll: string;

  constructor(
    private authService: AuthService,
    private homeService: HomeService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit() {
    this.getUserOnHomePage();
  }

  getUserOnHomePage() {
    this.spinnerService.showSpinner();
    this.homeService.getUser()
      .subscribe(
        ({ user: { userAvatar, login, posts } }: UserResponse) => {
          this.userAvatar = userAvatar;
          this.login = `@${login}`;
          this.spinnerService.hideSpinner();
          this.posts = posts;
        },
      );
  }

  updateAvatar() {
    this.getUserOnHomePage();
  }

  logout() {
    this.authService.resetUser();
  }

  tileClick(postId: string) {
    this.isFeedView = true;
    this.postToScroll = postId;
  }

  goBackToFeed() {
    this.isFeedView = false;
  }

}
