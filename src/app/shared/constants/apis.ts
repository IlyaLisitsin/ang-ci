const BASE_BE_URL = 'https://dry-reaches-46302.herokuapp.com/api';
// const BASE_BE_URL = 'http://localhost:5000/api';

export const AUTH_APIS: any = {
  login: `${BASE_BE_URL}/users/login`,
  register: `${BASE_BE_URL}/users`,
  current: `${BASE_BE_URL}/users/current`,
};

export const resetUserErrorMessages = [
  'invalid signature',
  'jwt expired',
];
