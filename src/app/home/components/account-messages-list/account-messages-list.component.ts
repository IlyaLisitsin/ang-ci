import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { HomeService } from '../../services/home/home.service';
import { SpinnerService } from '../../../shared/services/spinner/spinner.service';
import { cookieSessionName } from '../../../shared/constants/key-names';

@Component({
  selector: 'app-account-messages-list',
  templateUrl: './account-messages-list.component.html',
  styleUrls: ['./account-messages-list.component.scss']
})
export class AccountMessagesListComponent implements OnInit {
  @Input() goBackHandle: any;

  accountDialogsList = [];
  userAvatar: string;
  currentAccountId: string;
  isDialogListView = true;
  isMessagesView = false;

  constructor(
    private homeService: HomeService,
    private spinnerService: SpinnerService,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    this.userAvatar = this.homeService.userAvatar;
    this.getMessagesList();
  }

  getMessagesList() {
    this.spinnerService.showSpinner();
    this.homeService.getAccountMessagesList(this.cookieService.get(cookieSessionName)).pipe(
    mergeMap((dialogList: any) => {
      const list = dialogList.map(dialog => {
        const interlocutorId = dialog.lowerIdHigherId.split(this.homeService.logedUserId)[1];
        return this.homeService.getUserAvatar(interlocutorId);
      });

      return forkJoin(list).pipe(
        map((userAvatarItem: any) => {
          userAvatarItem.forEach((el, i) => dialogList[i].interlocutorAvatar = el.userAvatar);
          return dialogList;
        })
      );
    })).subscribe(
    list => {
      this.accountDialogsList = list.sort((b, a) => (a.lastActivity < b.lastActivity) ? -1 : ((a.lastActivity > b.lastActivity) ? 1 : 0));
      this.spinnerService.hideSpinner();
    },
    () => this.spinnerService.hideSpinner(),
  );

  }

  dialogItemClickHandle(lowerIdHigherId) {
    this.currentAccountId = lowerIdHigherId.split(this.homeService.logedUserId)[1];
    this.isDialogListView = false;
    this.isMessagesView = true;
  }

  goBackToMessagesList = () => {
    this.isDialogListView = true;
    this.isMessagesView = false;
    this.currentAccountId = '';

    this.getMessagesList();
  }

}
