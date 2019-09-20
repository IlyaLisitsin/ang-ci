import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material';

import { FeedTabComponent } from '../../components/feed-tab/feed-tab.component';
import { HomeService } from '../../services/home/home.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  @ViewChild('feedTab') feedTab: FeedTabComponent;
  @ViewChild('tabs') tabs: MatTabGroup;

  isShowPersonalAccountDetails = false;

  constructor(
    private homeService: HomeService,
  ) { }

  ngOnInit() {
  }

  onLinkClick(event) {
    if (event.tab.textLabel === 'Feed') {
      this.feedTab.resetFeedTab();
    } else if (event.tab.textLabel === 'Personal') {
      this.isShowPersonalAccountDetails = true;
    }
  }

  navigateToFeed = () => {
    this.tabs.selectedIndex = 0;
  }

}
