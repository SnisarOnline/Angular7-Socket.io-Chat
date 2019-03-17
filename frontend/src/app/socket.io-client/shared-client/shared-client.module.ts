import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientChatHttpService} from "./service/client-chat-http.service";
import {ClientChatSocketService} from "./service/client-chat-socket.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [],
  providers:[ClientChatHttpService, ClientChatSocketService]
})
export class SharedClientModule { }
