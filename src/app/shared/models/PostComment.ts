export interface PostComment {
  _id: string;
  commentAuthorLogin: string;
  commentAuthorId: string;
  text: string;
  replyTo: string;
  likedBy: Array<string>;
  commentDate: string;
}
