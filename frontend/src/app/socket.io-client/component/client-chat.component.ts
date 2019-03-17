import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ClientChatSocketService} from "../shared-client/service/client-chat-socket.service";
import {PopupWindowsComponent} from "../../shared/component/popup-windows/popup-windows.component";
import {PopupType} from "../../shared/component/popup-windows/popup-type-enum";
import {IMessage} from "../../shared/model/classMessage";
import {IUser} from "../../shared/model/classUser";
import {IRoom} from "../../shared/model/classRoom";


@Component({
  selector: 'app-chat',
  templateUrl: './client-chat.component.html',
  styleUrls: ['./client-chat.component.styl']
})
export class ClientChatComponent implements OnInit {

  private arrayRooms = ['defaultRoom', 'room1', 'Room2'];
  private online:{ status:string, author: IUser, room: IRoom} = {
    status: 'DISCONNECTED',
    author: {
      id: null,
      name: '',
      avatar: '',
    },
    room: {
      id: 0,
      name: ''
    }
  };
  public allMessage: IMessage[] = [];

  private dialogRef: MatDialogRef<PopupWindowsComponent> | null;



  constructor(
    private clientSocket: ClientChatSocketService,
    private dialogWindows: MatDialog,
  ) {}



  ngOnInit() {
    this.online.room.name = this.arrayRooms[0];


    /**
     * Принудительная авторизация пользователя
     * Настройки на всплывающее окно
     * @Info IMPORTANT https://material.angular.io/components/dialog/api#MatDialogConfig
     */
    setTimeout(() => {
      this.openUserPopup({
        disableClose: true,
        restoreFocus: true,
        data: {
          userid: this.online.author.id,
          username: this.online.author.name,
          avatar: this.online.author.avatar,
          title: 'Welcome',
          dialogType: PopupType.NEW
        }
      });
    },0);

  }



  /**
   * Открытие ПоПап-Окна для ввода имени пользователя
   * @Info https://material.angular.io/components/dialog/overview
   * @param {MatDialogConfig} options Параметры всплываюшего окна
   * @paramInfo https://material.angular.io/components/dialog/api#MatDialogConfig
   */
  private openUserPopup(options: MatDialogConfig): void {
    this.dialogRef = this.dialogWindows.open(PopupWindowsComponent, options);
    this.dialogRef.afterClosed().subscribe(valuePopup => {

      this.online.author.id = valuePopup.userid || this.online.author.id;
      this.online.author.name = valuePopup.username || this.online.author.name;
      this.online.author.avatar = valuePopup.avatar || this.online.author.avatar;

      if (PopupType.NEW === valuePopup.dialogType) {
        this.initIoConnection();
      } else if (PopupType.EDIT === valuePopup.dialogType) {
        console.log( 'valuePopup = PopupType.EDIT', PopupType.EDIT );
      }

    });
  }

  /**
   * Соединение с сервером после зполнения имени
   */
  private initIoConnection(){

    this.clientSocket.initSocket();
    this.joinRoom( this.online.room );

    this.clientSocket.onEvent("disconnect")
      .subscribe((disconnect) => {
        this.online.status = "DISCONNECT";
        console.log("disconnected", disconnect);
      });


    this.clientSocket.onEvent("connect")
      .subscribe((connect) => {
        this.online.status = "CONNECT";
        console.log("connected", connect);
      });

    this.clientSocket.onEvent("connect_timeout")
      .subscribe((connect_timeout) => {
        this.online.status = "connect_timeout";
        console.log("connect_timeout", connect_timeout);
      });

    this.clientSocket.onEvent("connect_failed")
      .subscribe((connect_failed) => {
        this.online.status = "connect_failed";
        console.log("connect_failed", connect_failed);
      });

    this.clientSocket.onEvent("connect_error")
      .subscribe((connect_error) => {
        this.online.status = "connect_error";
        console.log("connect_error",connect_error);
      });


    this.clientSocket.onEvent("reconnect")
      .subscribe((reconnect) => {
        this.online.status = "reconnect";
        console.log("reconnect", reconnect);
      });

    this.clientSocket.onEvent("reconnecting")
      .subscribe((reconnecting) => {
        this.online.status = "reconnecting";
        console.log("reconnecting", reconnecting);
      });

    this.clientSocket.onEvent("reconnect_attempt")
      .subscribe((reconnect_attempt) => {
        this.online.status = "reconnect_attempt";
        console.log("reconnect_attempt", reconnect_attempt);
      });

    this.clientSocket.onEvent("reconnect_failed")
      .subscribe((reconnect_failed) => {
        this.online.status = "reconnect_failed";
        console.log("reconnect_failed", reconnect_failed);
      });

    this.clientSocket.onEvent("reconnect_error")
      .subscribe((reconnect_error) => {
        this.online.status = "reconnect_error";
        console.log("reconnect_error", reconnect_error);
      });


    this.clientSocket.onEvent("error")
      .subscribe((error) => {
        this.online.status = "error";
        console.log("error", error);
      });

    this.clientSocket.onMessage()
      .subscribe((message: IMessage) => {
        console.log( "GET message => ", message );
        this.allMessage.push(message);
      });

  }

  /**
   * Отправка смс
   * @param {string} text
   */
  public saveChange(text) {
    if ( text == 1 ) {
      console.log( "server reconnect" );
      this.clientSocket.reconnect();
      return;
    }

    const message: IMessage = {
      author: this.online.author,
      room: this.online.room,
      text: text
    };
    this.clientSocket.send(message);
  }



  /**
   * Переключение комнат
   * @param {IRoom} newRoom
   */
  public joinRoom( newRoom ) {
    this.allMessage = [];

    if (newRoom.name !== this.online.room.name) {
      this.leaveRoom();

      this.online.room = newRoom;

      this.clientSocket.join({
        author: this.online.author,
        room: this.online.room
      });

    } else {
      this.online.room = newRoom;

      this.clientSocket.join({
        author: this.online.author,
        room: this.online.room
      });
    }
  }

  /**
   * Переключение комнат
   */
  public leaveRoom() {
    this.allMessage = [];

    this.clientSocket.leave({
      author: this.online.author,
      room: this.online.room
    });

    this.online.room = {
      id: null,
      name: ''
    };
  }


  /**
   * Не используется
   * Переименование пользователя/Автора смс
   */
  private onClickUserInfo() {

    /**
     * Настройки на всплывающее окно
     * @Info IMPORTANT https://material.angular.io/components/dialog/api#MatDialogConfig
     */
    this.openUserPopup({
      restoreFocus: true,
      data: {
        userid: this.online.author.id,
        username: this.online.author.name,
        avatar: this.online.author.avatar,
        title: 'Edit Details',
        dialogType: PopupType.EDIT
      }
    });

  }
}
