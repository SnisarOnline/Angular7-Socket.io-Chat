import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientChatModule} from "./socket.io-client/client-chat.module";

const routes: Routes = [
  {
    path: 'io-client',
    loadChildren: () => ClientChatModule,
  }
  ,{path: '**', redirectTo: 'io-client'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
