import { Component, OnInit } from '@angular/core';

import { Post } from '../../../shared/models/Post';
import { HomeService } from '../../services/home/home.service';
import { SpinnerService } from '../../../shared/services/spinner/spinner.service';

interface FeedResponse {
  userId: string;
  userAvatar: string;
  subscriptions: Array<string>;
  posts: Array<Post>;
  token: string;
  login: string;
}

@Component({
  selector: 'app-feed-tab',
  templateUrl: './feed-tab.component.html',
  styleUrls: ['./feed-tab.component.scss']
})
export class FeedTabComponent implements OnInit {
  feedPosts: Array<Post>;
  isAccountDetailsView: boolean;
  accountId: string;
  isLoggedUser = false;

  constructor(
    private homeService: HomeService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit() {
    this.resetFeedTab();
  }

  getFeedPosts = () => {
    this.spinnerService.showSpinner();
    this.feedPosts = [];
    this.homeService.getFeedPosts().subscribe((response: FeedResponse) => {
      this.feedPosts = response.posts;
      this.homeService.userAvatar = response.userAvatar;
      this.homeService.logedUserId = response.userId;
      this.homeService.loggedUserLogin = response.login;
      this.homeService.loggedUserSubscriptions = response.subscriptions;
      this.spinnerService.hideSpinner();
    });
  }

  goBackToFeedView = () => {
    this.isAccountDetailsView = false;
    this.getFeedPosts();
  }

  resetFeedTab() {
    this.isAccountDetailsView = false;
    this.getFeedPosts();
  }

  switchAccountDetails = (id: string) => {
    this.accountId = id;
    this.isLoggedUser = id === this.homeService.logedUserId;
    this.isAccountDetailsView = true;
  }

}
