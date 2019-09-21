import { Post } from './Post';
import { PostComment } from './PostComment';

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
    comments: Array<PostComment>
  };
  token: string;
}
