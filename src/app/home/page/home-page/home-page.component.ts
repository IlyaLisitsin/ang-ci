import { Component, OnInit } from '@angular/core';

import { HomeService } from '../../services/home/home.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private homeService: HomeService,
  ) { }

  ngOnInit() {
  }

  click() {
    this.homeService.kek();
  }

}
