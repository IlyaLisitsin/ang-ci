import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_APIS } from '../../../shared/constants/apis';

@Injectable()
export class HomeService {
  logedUserId: string;

  constructor(
    private http: HttpClient,
  ) { }

  getLoggedUser() {
    return this.http.get(AUTH_APIS.current);
  }

  updateUserAvatar({ base64Str }) {
    const body = { newAvatarStr: base64Str };
    return this.http.post(AUTH_APIS.updateUserAvatar, body);
  }

  getFeedPosts() {
    return this.http.get(AUTH_APIS.getFeed);
  }

  getUserById(id: string) {
    return this.http.get(`${AUTH_APIS.current}?unlogedUserId=${id}`);
  }
}
