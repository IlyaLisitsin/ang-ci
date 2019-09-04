import { Component, OnInit } from '@angular/core';

import { Post } from '../../../shared/models/Post';
import { HomeService } from '../../services/home/home.service';
import { SpinnerService } from '../../../shared/services/spinner/spinner.service';

interface FeedResponse {
  posts: Array<Post>;
  token: string;
}

@Component({
  selector: 'app-feed-tab',
  templateUrl: './feed-tab.component.html',
  styleUrls: ['./feed-tab.component.scss']
})
export class FeedTabComponent implements OnInit {
  feedPosts: Array<Post>;
  userDetails: false;

  constructor(
    private homeService: HomeService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit() {
    this.getFeedPosts();
  }

  getFeedPosts() {
    this.spinnerService.showSpinner();
    this.homeService.getFeedPosts().subscribe((response: FeedResponse) => {
      this.feedPosts = response.posts;
      this.spinnerService.hideSpinner();
    });
  }

  goBackToFeed() {
    console.log('go back to feed!');
  }

}
