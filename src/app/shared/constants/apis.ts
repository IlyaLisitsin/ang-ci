// const BASE_BE_URL = 'http://localhost:5000/api';
const BASE_BE_URL = 'https://anc-ci-be.herokuapp.com/api';

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
};

export const resetUserErrorMessages = [
  'invalid signature',
  'jwt expired',
  'jwt malformed',
];
