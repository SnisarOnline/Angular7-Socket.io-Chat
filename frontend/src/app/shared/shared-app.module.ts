import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./material/material.module";

import { AutofocusDirective } from './directive_pipes/autofocus.directive';
import { AutosizeDirective } from './directive_pipes/autosize.directive';
import {_localStorageService} from "./services/_local-storage.service";
import {_eventService} from "./services/_eventService";
import {ThemeSwitchingService} from "./component/themeToggle/themeSwitching.service";
import {ThemeToggleComponent} from "./component/themeToggle/themeToggle.component";
import { PopupWindowsComponent } from './component/popup-windows/popup-windows.component';

import {ChatFormComponent} from "./component/chat-form/chat-form.component";
import {ChatMessageComponent} from "./component/chat-message/chat-message.component";
import {CardMessageComponent} from "./component/chat-message/card-message/card-message.component";
import {ChatRoomComponent} from './component/chat-room/chat-room.component';
import {MalihuScrollbarModule} from "ngx-malihu-scrollbar";

@NgModule({
  declarations: [
    AutofocusDirective,
    AutosizeDirective,
    ThemeToggleComponent,
    PopupWindowsComponent,
    ChatFormComponent,
    ChatMessageComponent,
    CardMessageComponent,
    ChatRoomComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule,
    MalihuScrollbarModule.forRoot(),
  ],
  exports: [
    MaterialModule,
    AutofocusDirective,
    AutosizeDirective,
    ThemeToggleComponent,
    PopupWindowsComponent,
    ChatFormComponent,
    ChatMessageComponent,
    CardMessageComponent,
    ChatRoomComponent,
  ],
  providers: [
    _eventService,
    _localStorageService,
    ThemeSwitchingService,
  ],

  /**
   * entryComponents: [ PopupWindowsComponent ]
   * *
   * * Это для динамически добавленных компонентов, которые добавляются с помощью ViewContainerRef.createComponent().
   * * Добавление их в ENTRYCOMPONENTS указывает компилятору автономного шаблона компилировать их,
   * * и создавать для них фабрики.
   * * @Info https://material.angular.io/components/dialog/overview#configuring-dialog-content-via-code-entrycomponents-code-
   * * @Info http://qaru.site/questions/71860/what-is-entrycomponents-in-angular-ngmodule
   * * @Info https://angular.io/docs/ts/latest/cookbook/dynamic-component-loader.html
   *
   */
  entryComponents: [ PopupWindowsComponent ],
})
export class SharedAppModule { }
