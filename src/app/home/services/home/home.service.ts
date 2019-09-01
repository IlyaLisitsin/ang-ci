import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_APIS } from '../../../shared/constants/apis';

@Injectable()
export class HomeService {

  constructor(
    private http: HttpClient,
  ) { }

  getUser() {
    return this.http.get(AUTH_APIS.current);
  }

}
