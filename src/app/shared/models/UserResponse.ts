import { Post } from './Post';

export interface UserResponse {
  user: {
    _id: string;
    email: string;
    login: string;
    token: string;
    userAvatar: string;
    subscriptions: any;
    subscribers: any;
    posts: Array<Post>;
  };
  token: string;
}
