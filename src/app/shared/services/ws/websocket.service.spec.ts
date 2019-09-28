import { TestBed, inject } from '@angular/core/testing';

import { WebsocketService } from './websocket.service';
import { CookieService } from 'ngx-cookie-service';

describe('WebsocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WebsocketService,
        CookieService,
      ]
    });
  });

  it('should be created', inject([WebsocketService], (service: WebsocketService) => {
    expect(service).toBeTruthy();
  }));
});
