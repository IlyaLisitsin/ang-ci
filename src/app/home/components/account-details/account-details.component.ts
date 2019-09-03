import {Component, Input, OnInit} from '@angular/core';

import {UserResponse} from "../../../shared/models/UserResponse";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {HomeService} from "../../services/home/home.service";
import {Post} from "../../../shared/models/Post";

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  @Input() isLoggedUser: boolean;

  isFeedView = false;
  showSpinner: boolean;
  userAvatar: string;
  login: string;
  posts: Array<Post>;
  postToScroll: string;

  constructor(
    private authService: AuthService,
    private homeService: HomeService,
  ) { }

  ngOnInit() {
    this.getUserOnHomePage();
  }

  getUserOnHomePage() {
    this.showSpinner = true;
    this.homeService.getUser()
      .subscribe(
        ({ user: { userAvatar, login, posts } }: UserResponse) => {
          this.userAvatar = userAvatar;
          this.login = `@${login}`;
          this.showSpinner = false;
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
    console.log(32434)
    this.isFeedView = false;
  }

}
