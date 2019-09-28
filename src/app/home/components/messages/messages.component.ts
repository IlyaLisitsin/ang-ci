import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { WS } from '../../../shared/services/ws/websocket.events';
import { WebsocketService } from '../../../shared/services/ws/websocket.service';
import { HomeService } from '../../services/home/home.service';
import { SpinnerService } from '../../../shared/services/spinner/spinner.service';

interface Message {
  text: string;
  sender: string;
  messageSenderAvatar: string;
  isFromLoggedUser: boolean;
}

interface MessageFromReponse {
  text: string;
  sender: string;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  @Input() goBackHandle: any;
  @Input() recipientId: string;
  @Input() userAvatar: string;

  messagesCollection: Array<Message> = [];
  messagesSubscription: Subscription;

  accountDetailsState: string;
  isMessagesView = true;

  constructor(
    private wsService: WebsocketService,
    private homeService: HomeService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit() {
    const lowerIdHigherId = [this.homeService.logedUserId, this.recipientId].sort((a, b) => {
      if (a > b) {
        return 1;
      } else {
        return -1;
      }
    }).join('');

    this.spinnerService.showSpinner();
    this.homeService.getMessagesHistory(lowerIdHigherId).subscribe(
      (messages: Array<MessageFromReponse>) => {
        messages.map((message: MessageFromReponse) => this.messagesCollection.push({
          text: message.text,
          sender: message.sender,
          messageSenderAvatar: message.sender === this.homeService.logedUserId ? this.homeService.userAvatar : this.userAvatar,
          isFromLoggedUser: message.sender === this.homeService.logedUserId,
        }));
        this.spinnerService.hideSpinner();
      },
    );

    this.messagesSubscription = this.wsService.on(WS.ON.MESSAGES, this.recipientId).subscribe(
      (messageData: { text: string, sender: string }) => {
        const { text, sender } = messageData;

        this.messagesCollection.push({
          text,
          sender,
          messageSenderAvatar: sender === this.homeService.logedUserId ? this.homeService.userAvatar : this.userAvatar,
          isFromLoggedUser: sender === this.homeService.logedUserId,
        });
      },
    );
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

  showAccountDetails(accountId: string) {
    this.accountDetailsState = accountId;
    this.isMessagesView = false;
  }

  goBackToMessagesView = () => {
    this.accountDetailsState = '';
    this.isMessagesView = true;
  }


}
