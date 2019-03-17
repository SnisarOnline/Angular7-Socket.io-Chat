import {Component, OnInit, Input, Output, EventEmitter, Renderer2, HostListener} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {IMessage} from "../../model/classMessage";

@Component({
  selector: 'shared-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.styl']
})
export class ChatFormComponent implements OnInit {

  @Input('recordMessage') private oldMessage:IMessage; // Получаем
  @Output('sendMessage')  public newMessage = new EventEmitter(); // Отправляем

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      console.log( event );
    }
  }


  private FormMessage: string;
  private HTMLtextarea: HTMLElement;


  /**
   * @param {FormBuilder} fb
   * @param {Renderer2} renderer => https://angular.io/api/core/Renderer2#renderer2
   */
  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
  ) {}


  ngOnInit() {
    this.HTMLtextarea = this.renderer.selectRootElement('textarea');
  }


  send() {
    this.newMessage.emit(this.FormMessage);
    this.renderer.removeAttribute( this.HTMLtextarea,"style"); // обнулить высоту директивы Autosize
    this.FormMessage = "";
  }

}
