import { Component, OnInit } from '@angular/core';

// import { HomeService } from '../../services/home/home.service';
// import { AuthService } from '../../../shared/services/auth/auth.service';
//
// import { UserResponse } from '../../../shared/models/UserResponse';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  isUserDetails: false;
  // showSpinner: boolean;
  // userAvatar: string;
  // login: string;
  // id: string;


  constructor(
    // private authService: AuthService,
    // private homeService: HomeService,
  ) { }

  ngOnInit() {
    // this.getUserOnHomePage();
  }

  onLinkClick(event) {
  }

  // getUserOnHomePage() {
  //   this.showSpinner = true;
  //   this.homeService.getUser()
  //     .subscribe(
  //       ({ user: { userAvatar, email, login, _id } }: UserResponse) => {
  //         this.userAvatar = userAvatar;
  //         this.login = `@${login}`;
  //         this.id = _id;
  //         this.showSpinner = false;
  //       },
  //     );
  // }
  //
  // updateAvatar() {
  //   this.getUserOnHomePage();
  // }
  //
  // logout() {
  //   this.authService.resetUser();
  // }

}
