export interface UserResponse {
  user: {
    _id: string;
    email: string;
    token: string;
  };
}
