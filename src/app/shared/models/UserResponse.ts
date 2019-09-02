export interface UserResponse {
  user: {
    _id: string;
    email: string;
    login: string;
    token: string;
    userAvatar: string;
    subscriptions: any;
    subscribers: any;
  };
  token: string;
}
