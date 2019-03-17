import {IUser} from "./classUser";
import {IRoom} from "./classRoom";

export class IMessage {
  author: IUser;
  room: IRoom;
  text: 'Hello World';
}
