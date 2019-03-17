import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms"; // ngModel
import {MalihuScrollbarModule} from "ngx-malihu-scrollbar";
import {ClientChatRoutingModule} from "./client-chat-routing.module";

import {SharedAppModule} from "../shared/shared-app.module";
import {SharedClientModule} from "./shared-client/shared-client.module";

import {ClientChatComponent} from "./component/client-chat.component";


@NgModule({
  declarations: [
    ClientChatComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    // MalihuScrollbarModule.forRoot(),
    ClientChatRoutingModule,
    SharedAppModule,
    SharedClientModule,
  ],
  exports: [ClientChatComponent]
})
/**
 * socket-io-client
 * @Info: https://socket.io/
 * @Info:
 */
export class ClientChatModule { }
