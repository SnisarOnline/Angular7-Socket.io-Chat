import {Component, Input} from '@angular/core';
import {IMessage} from "../../../model/classMessage";
import {IUser} from "../../../model/classUser";

@Component({
  selector: 'shared-card-form-message',
  templateUrl: './card-message.component.html',
  styleUrls: ['./card-message.component.styl']
})
/**
 * Вывод Каждого сообщения
 */
export class CardMessageComponent {

  @Input('message') newMessage: IMessage;
  @Input() user: IUser;

  constructor() {
    console.log( 'start CardMessageComponent ' );
  }

}
