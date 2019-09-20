import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AUTH_APIS } from '../../../shared/constants/apis';

@Injectable()
export class HomeService {
  logedUserId: string;
  userAvatar: string;
  loggedUserSubscriptions: Array<string> = [];

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

  searchUsers(searchString: string) {
    return this.http.get(`${AUTH_APIS.searchUsers}?searchQuery=${searchString}`);
  }

  followUser(subscriptionId: string) {
    const body = { subscriptionId };
    return this.http.put(`${AUTH_APIS.followUser}`, body);
  }

  unfollowUser(subscriptionId: string) {
    const body = { subscriptionId };
    return this.http.put(`${AUTH_APIS.unfollowUser}`, body);
  }

  addPost(body) {
    return this.http.put(`${AUTH_APIS.addPost}`, body);
  }

  likePost({ postId, postAuthorId }) {
    const body = { postId, postAuthorId };
    return this.http.put(`${AUTH_APIS.likePost}`, body);
  }

  unlikePost({ postId, postAuthorId }) {
    const body = { postId, postAuthorId };
    return this.http.put(`${AUTH_APIS.unlikePost}`, body);
  }

  getLikes(likedBy: Array<string>) {
    return this.http.get(`${AUTH_APIS.getLikes}?userIds=${likedBy.join(',')}` );
  }
}
