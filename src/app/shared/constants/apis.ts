// const BASE_BE_URL = 'http://localhost:5000/api';
const BASE_BE_URL = 'https://anc-ci-be.herokuapp.com/api';
//
// export const WS_URL = 'ws://localhost:5000';
export const WS_URL = 'wss://anc-ci-be.herokuapp.com';

export const AUTH_APIS: any = {
  login: `${BASE_BE_URL}/users/login`,
  register: `${BASE_BE_URL}/users`,
  current: `${BASE_BE_URL}/users/current`,
  updateUserAvatar: `${BASE_BE_URL}/users/update-avatar`,
  getFeed: `${BASE_BE_URL}/users/feed`,
  searchUsers: `${BASE_BE_URL}/users/search`,
  followUser: `${BASE_BE_URL}/users/follow`,
  unfollowUser: `${BASE_BE_URL}/users/unfollow`,
  addPost: `${BASE_BE_URL}/users/add-post`,
  likePost: `${BASE_BE_URL}/users/like-post`,
  unlikePost: `${BASE_BE_URL}/users/unlike-post`,
  getLikes: `${BASE_BE_URL}/users/get-likes`,
  addPostComment: `${BASE_BE_URL}/users/add-post-comment`,
  likePostComment: `${BASE_BE_URL}/users/like-post-comment`,
  unlikePostComment: `${BASE_BE_URL}/users/unlike-post-comment`,
  getCommentsList: `${BASE_BE_URL}/users/get-comments-list`,
  getMessagesHistory: `${BASE_BE_URL}/messages/get-messages-history`,
};

export const resetUserErrorMessages = [
  'invalid signature',
  'jwt expired',
  'jwt malformed',
];
