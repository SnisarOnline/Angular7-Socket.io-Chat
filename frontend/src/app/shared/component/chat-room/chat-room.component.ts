import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IRoom} from "../../model/classRoom";

@Component({
  selector: 'shared-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.styl']
})
export class ChatRoomComponent implements OnInit{

  @Input() arrayRooms: string[];
  @Output() joinRoom = new EventEmitter<IRoom>();
  @Output() leaveRoom = new EventEmitter<boolean>();
  chooseRoom: IRoom = {
    id: 0,
    name: ''
  };

/* TODO: Сделать нормальные стили для кнопок */
  constructor() {}

  ngOnInit(){
    this.chooseRoom.name = this.arrayRooms[0];
  }

  public join() {
    this.chooseRoom.id = this.arrayRooms.indexOf(this.chooseRoom.name);
    this.joinRoom.emit( this.chooseRoom );
  }

  public leave() {
    this.leaveRoom.emit( true );
  }

}
