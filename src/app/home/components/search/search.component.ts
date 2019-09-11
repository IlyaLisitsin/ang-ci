import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { debounceTime, takeUntil, tap, map, filter, delay, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { MatSelectChange } from '@angular/material';

import { HomeService } from '../../services/home/home.service';

interface UserSearchResult {
  login: string;
  userAvatar: string;
  _id: string;
}

interface UsersSearchResponse {
  usersSearchResult: Array<UserSearchResult>;
  token: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  checkedUserId: string;

  isAccountDetailsView = false;
  isLoggedUser = false;

  constructor(
    private homeService: HomeService,
  ) { }

  public userSearchSelect = new FormControl();
  public userSearchInput = new FormControl();
  public searching = false;
  public userSearchResults: ReplaySubject<Array<any>> = new ReplaySubject(1);
  protected onDestroy = new Subject<void>();

  ngOnInit() {
    this.userSearchInput.valueChanges
      .pipe(
        filter(search => !!search),
        tap(() => this.searching = true),
        takeUntil(this.onDestroy),
        debounceTime(200),
        switchMap(searchInput => this.homeService.searchUsers(searchInput).pipe(
          map((response: UsersSearchResponse) => response.usersSearchResult),
          catchError(() => of(null)),
        )),
        delay(500),
      )
      .subscribe(usersSearchResult => {
          this.searching = false;
          this.userSearchResults.next(usersSearchResult);
        },
        () => {
          this.searching = false;
        });

  }

  selectionChange(event: MatSelectChange) {
    this.checkedUserId = event.value._id;
    this.isLoggedUser = event.value._id === this.homeService.logedUserId;
    this.isAccountDetailsView = true;
  }

  goBackToSearchView() {
    this.isAccountDetailsView = false;
    this.userSearchInput.setValue('');
    this.userSearchSelect.setValue('');
    this.userSearchResults.next(null);
    this.checkedUserId = '';
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
