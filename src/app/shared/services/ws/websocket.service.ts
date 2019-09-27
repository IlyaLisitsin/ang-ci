import { Injectable, OnDestroy } from '@angular/core';
import { WebSocketSubject, WebSocketSubjectConfig } from "rxjs/observable/dom/WebSocketSubject";
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";

import { WS_URL } from "../../constants/apis";
import {distinctUntilChanged, filter, map, share, takeWhile} from "rxjs/operators";
import {Subscription} from "rxjs/Subscription";
import {Subject} from "rxjs/Subject";
import {interval} from "rxjs/observable/interval";
import {cookieSessionName} from "../../constants/key-names";
import {CookieService} from "ngx-cookie-service";

interface WsMessage<T> {
  event: string;
  data: T;
}

@Injectable()
export class WebsocketService implements OnDestroy {
  // private websocket$: WebSocketSubject<IWsMessage<any>>;
  private websocket$: WebSocketSubject<any>;
  private connection$: Observer<boolean>;
  public status: Observable<boolean>;
  private reconnection$: Observable<number>;

  // private wsMessages$: Subject<IWsMessage<any>>;
  private wsMessages$: Subject<any>;


  private websocketSub: Subscription;
  private statusSub: Subscription;

  private isConnected: boolean;
  private reconnectInterval = 5000;
  private reconnectAttempts = 10;

  config: WebSocketSubjectConfig;


  constructor(
    private cookieService: CookieService,
  ) {
    this.wsMessages$ = new Subject<any>();

    this.status = new Observable<boolean>((observer) => {
      this.connection$ = observer;
    }).pipe(share(), distinctUntilChanged());

    // run reconnect if not connection
    this.statusSub = this.status
      .subscribe((isConnected) => {
        this.isConnected = isConnected;

        if (!this.reconnection$ && typeof(isConnected) === 'boolean' && !isConnected) {
          this.reconnect();
        }
      });

  }

  ngOnDestroy(): void {
    this.websocketSub.unsubscribe();
    this.statusSub.unsubscribe();
  }

  connect() {

    // console.log()
    const token = this.cookieService.get(cookieSessionName);
    console.log('URL', `${WS_URL}?token=${token}`)
    if (!this.config) {
      this.config = {
        url: `${WS_URL}?token=${token}`,
        closeObserver: {
          next: (event: CloseEvent) => {
            console.log('WebSocket closed!');
            this.websocket$ = null;
            this.connection$.next(false);
          }
        },
        openObserver: {
          next: (event: Event) => {
            console.log('WebSocket connected!');
            this.connection$.next(true);
          }
        }
      }
    }

    this.websocket$ = new WebSocketSubject(this.config);
    this.websocketSub = this.wsMessages$.subscribe(
      null, (error: ErrorEvent) => console.error('WebSocket error!', error)
    );

    this.websocket$.subscribe(
      (message) => this.wsMessages$.next(message),
      (error: Event) => {
        if (!this.websocket$) {
          // run reconnect if errors
          this.reconnect();
        }
      });

  }

  private reconnect(): void {
    this.reconnection$ = interval(this.reconnectInterval).pipe(
      takeWhile((v, index) => index < this.reconnectAttempts && !this.websocket$)
    );

    this.reconnection$.subscribe(
      () => this.connect(),
      null,
      () => {
        this.reconnection$ = null;

        if (!this.websocket$) {
          this.wsMessages$.complete();
          this.connection$.complete();
        }
      });
  }

  on<T>(event: string): Observable<T> {
    if (event) {
      return this.wsMessages$.pipe(
        filter((message: WsMessage<T>) => message.event === event),
        map((message: WsMessage<T>) => message.data)
      );
    }
  }

  send(event: string, data: any = {}): void {
    console.log(event)
    if (event && this.isConnected) {
      this.websocket$.next(<any>JSON.stringify({ event, data }));
    } else {
      console.error('Send error!');
    }
  }
}
