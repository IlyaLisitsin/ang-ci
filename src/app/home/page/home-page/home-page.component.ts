import { Component, OnInit } from '@angular/core';

import { HomeService } from '../../services/home/home.service';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  showSpinner: boolean;

  constructor(
    private authService: AuthService,
    private homeService: HomeService,
  ) { }

  ngOnInit() {
    this.showSpinner = true;
    this.homeService.getUser()
      .subscribe(
        () => this.showSpinner = false,
      );
  }

}
