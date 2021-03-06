import { PostComment } from './PostComment';

export interface Post {
  _id: string;
  image: string;
  postDate: string;
  postText: string;
  postAuthorLogin: string;
  postAuthorId: string;
  postAuthorAvatar: string;
  likedBy: Array<string>;
  isLikedByLoggedUser: boolean;
  likesAmount: number;
  comments: Array<PostComment>;
  isAddCommentInProgress: boolean;
}
