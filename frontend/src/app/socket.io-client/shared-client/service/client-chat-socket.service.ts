import {Injectable} from '@angular/core';
import * as socketIo from "socket.io-client";
import { Observable } from 'rxjs';

import {IMessage} from "../../../shared/model/classMessage";
import {IUser} from "../../../shared/model/classUser";
import {IRoom} from "../../../shared/model/classRoom";

const SERVER_URL = `http://localhost:3000/chat`;

/**
 * Service socket.io-client
 * @Info: https://socket.io/
 * @Info: https://habr.com/ru/post/440546/
 */
@Injectable()
export class ClientChatSocketService  {
  private ioClient;

  constructor() {
    this.log(`INIT Service`);
  }

  private log(message, func='', jsonObj:any=''){
    console.info(`SERVICE socket.io-client : ${func}  ${message}`, jsonObj);
  }

  /**
   * Подключение к беку с выбором комнаты по умолчанию
   */
  public initSocket(): void {
    this.log(`INIT Socket`);
    this.ioClient = socketIo(SERVER_URL);
  }

  /**
   * Отправка смс на сервер
   * @param {IMessage} message
   */
  public send(message: IMessage): void {
    this.log(`send Message`, `send()`);
    this.ioClient.emit(`clientMessage`, message);
  }

  /**
   * Подписка на получение смс (подключения, отключения пользователей)
   * @returns {Observable<IMessage>}
   */
  public onMessage(): Observable<IMessage> {
    this.log(`Subscribe to a new messages`, `onMessage()`);
    return new Observable<IMessage>(observer => {
      this.ioClient.on(`serverMessage`, (data: IMessage) => {
        this.log(`GET Message from server`, `onMessage()`);
        observer.next(data);
      });
    });
  }

  /**
   * Произвольная подписка
   * @param event
   * @returns {Observable<any>}
   */
  public onEvent(event): Observable<any> {
    this.log(`SET new Event( ${event} )`, `onEvent()`);
    return new Observable<any>(observer => {
      this.ioClient.on(event, () => observer.next());
    });
  }



  /**
   * подключение
   */
  public reconnect(): void {
    this.log(`start Reconnecting`, `reconnect()`);
    this.ioClient.connect();
  }

  /**
   * Отключение
   */
  public disconnect(): void {
    this.log(`start Disconnect`, `disconnect()`);
    this.ioClient.disconnect();
  }

  /**
   * @param {IUser, IRoom} userSelect
   */
  public join(userSelect: {author:IUser, room:IRoom}) {
    this.log(``, `join( newRoom )`, userSelect);
    this.ioClient.emit(`clientJoin`, userSelect);
  }

  /**
   * @param {IUser, IRoom} userSelect
   */
  public leave(userSelect: {author:IUser, room:IRoom}) {
    this.log(``, `leave( room )`, userSelect);
    this.ioClient.emit(`clientLeave`, userSelect);
  }
}
