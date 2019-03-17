import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientChatComponent} from "./component/client-chat.component";

const routes: Routes = [
  {
    path: '',
    component: ClientChatComponent
  }
  ,{path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientChatRoutingModule { }
