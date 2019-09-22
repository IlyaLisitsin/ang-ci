export interface PostComment {
  _id: string;
  commentAuthorLogin: string;
  commentAuthorId: string;
  commentAuthorAvatar: string;
  text: string;
  replyTo: string;
  likedBy: Array<string>;
  commentDate: string;
  isLikedByLoggedUser: boolean;
}
