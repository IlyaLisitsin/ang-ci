// const BASE_BE_URL = 'http://localhost:5000/api';
const BASE_BE_URL = 'https://anc-ci-be.herokuapp.com/api';

export const AUTH_APIS: any = {
  login: `${BASE_BE_URL}/users/login`,
  register: `${BASE_BE_URL}/users`,
  current: `${BASE_BE_URL}/users/current`,
};

export const resetUserErrorMessages = [
  'invalid signature',
  'jwt expired',
  'jwt malformed',
];
