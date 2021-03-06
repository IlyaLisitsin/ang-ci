import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AUTH_APIS } from '../../../shared/constants/apis';

@Injectable()
export class HomeService {
  logedUserId: string;
  loggedUserLogin: string;
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

  addPostComment({ postId, text, postAuthorId, commentAuthorLogin, replyTo, commentAuthorAvatar }) {
    const body = {
      text,
      postId,
      replyTo,
      postAuthorId,
      commentAuthorLogin,
      commentAuthorAvatar,
      commentDate: new Date().toISOString(),
    };

    return this.http.put(`${AUTH_APIS.addPostComment}`, body);
  }

  likePostComment({ postCommentId: _id, postCommentAuthorId, postId, postAuthorId }) {
    const body = { postCommentId: _id, postCommentAuthorId, postId, postAuthorId };
    return this.http.put(`${AUTH_APIS.likePostComment}`, body);
  }

  unlikePostComment({ postCommentId: _id, postCommentAuthorId, postId, postAuthorId }) {
    const body = { postCommentId: _id, postCommentAuthorId, postId, postAuthorId };
    return this.http.put(`${AUTH_APIS.unlikePostComment}`, body);
  }

  getComments({ postId, postAuthorId }) {
    return this.http.get(`${AUTH_APIS.getCommentsList}?postId=${postId}&postAuthorId=${postAuthorId}`);
  }

  getMessagesHistory(lowerIdHigherId: string) {
    return this.http.get(`${AUTH_APIS.getMessagesHistory}?lowerIdHigherId=${lowerIdHigherId}`);
  }

  getAccountMessagesList(jwtToken: string) {
    return this.http.get(`${AUTH_APIS.getAccountMessagesList}?token=${jwtToken}`);
  }

  getUserAvatar(id: string) {
    return this.http.get(`${AUTH_APIS.getUserAvatar}?id=${id}`);
  }

}
