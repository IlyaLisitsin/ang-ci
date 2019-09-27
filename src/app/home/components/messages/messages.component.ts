import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { WS } from '../../../shared/services/ws/websocket.events';
import { WebsocketService } from '../../../shared/services/ws/websocket.service';
import {HomeService} from "../../services/home/home.service";
import {Subscription} from "rxjs/Subscription";
// import {MessagesService} from './services/messages.service';

interface Message {
  from: string;
  to: string;
  text: string;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  @Input() goBackHandle: any;
  @Input() recipientId: string;

  // messages$: Observable<Message[]>;
  messagesCollection: Array<string> = [];
  messagesSubscription: Subscription

  constructor(
    private wsService: WebsocketService,
    private homeService: HomeService,
  ) { }

  ngOnInit() {
    // this.messages$ = this.wsService.on(WS.ON.MESSAGES);

    this.messagesSubscription = this.wsService.on(WS.ON.MESSAGES).subscribe(
      (messageText: string) => this.messagesCollection.push(messageText),
    )
  }

  ngOnDestroy(): void {
    this.messagesSubscription.unsubscribe();
  }

  sendMessage(messageText: string) {
    this.wsService.send(WS.SEND.SEND_MESSAGE, {
      from: this.homeService.logedUserId,
      to: this.recipientId,
      text: messageText,
    });
  }

}
