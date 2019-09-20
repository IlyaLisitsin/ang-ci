import { Component, Input, OnInit } from '@angular/core';

import { SpinnerService } from '../../../shared/services/spinner/spinner.service';
import { HomeService } from '../../services/home/home.service';

interface Like {
  userId: string;
  login: string;
  userAvatar: string;
  isLoadInProcess: boolean;
}

@Component({
  selector: 'app-likes-list',
  templateUrl: './likes-list.component.html',
  styleUrls: ['./likes-list.component.scss']
})
export class LikesListComponent implements OnInit {
  @Input() goBackHandle: any;

  @Input()
  set likedBy(likedBy: Array<string>) {
    if (likedBy) {
      this.getLikesList(likedBy);
    }
  }

  isLikesListView = true;
  likesList: Array<Like>;
  activeAccountId: string;

  constructor(
    private spinnerService: SpinnerService,
    private homeService: HomeService,
  ) { }

  ngOnInit() {
  }

  getLikesList(likedBy: Array<string>) {
    this.spinnerService.showSpinner();
    this.homeService.getLikes(likedBy).subscribe(
      (likesList: Array<Like>) => {
        this.likesList = likesList;
        this.spinnerService.hideSpinner();
      },
      () => this.spinnerService.hideSpinner(),
    );
  }

  goBack() {
    this.goBackHandle();
  }

  checkSubscription(userId: string) {
    return this.homeService.loggedUserSubscriptions.includes(userId);
  }

  follow(userId: string) {
    const currentLikeItem = this.likesList.find(likeItem => likeItem.userId === userId);
    currentLikeItem.isLoadInProcess = true;
    this.homeService.followUser(userId).subscribe(
      () => {
        currentLikeItem.isLoadInProcess = false;
        this.homeService.loggedUserSubscriptions.push(userId);
      },
      () => currentLikeItem.isLoadInProcess = false,
    );
  }

  unfollow(userId: string) {
    const currentLikeItem = this.likesList.find(likeItem => likeItem.userId === userId);
    currentLikeItem.isLoadInProcess = true;
    this.homeService.unfollowUser(userId).subscribe(
      () => {
        currentLikeItem.isLoadInProcess = false;
        this.homeService.loggedUserSubscriptions =
          this.homeService.loggedUserSubscriptions.filter(el => el !== userId);
      },
      () => currentLikeItem.isLoadInProcess = false,
    );
  }

  setActiveAccountId(userId: string) {
    this.activeAccountId = userId;
    this.isLikesListView = false;
  }

  goBackToLikesListView = () => {
    this.activeAccountId = '';
    this.isLikesListView = true;
  }
}
