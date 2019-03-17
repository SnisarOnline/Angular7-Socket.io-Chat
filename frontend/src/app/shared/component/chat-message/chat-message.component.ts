import {
  Component,
  Input,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {MatList, MatListItem} from "@angular/material";
import {IMessage} from "../../model/classMessage";
import {IUser} from "../../model/classUser";

import {MalihuScrollbarService} from "ngx-malihu-scrollbar";
interface CustomScrollbarOptions {
  /**
   * Define content’s scrolling axis (the type of scrollbars added to the element: vertical and/of horizontal).
   * Available values: "y", "x", "yx". y -vertical, x - horizontal, yx - vertical and horizontal
   */
  axis?: "x"|"y"|"yx";
  /**
   * Set a scrollbar ready-to-use theme. See themes demo for all themes - http://manos.malihu.gr/tuts/custom-scrollbar-plugin/scrollbar_themes_demo.html
   */
  theme?: string;
  /**
   * Automatically hide the scrollbar when idle or mouse is not over the content
   */
  autoHideScrollbar?: boolean;
  /**
   * Enable or disable auto-expanding the scrollbar when cursor is over or dragging the scrollbar.
   */
  autoExpandScrollbar?: boolean;
  /**
   * Enable or disable content touch-swipe scrolling for touch-enabled devices.
   * To completely disable, set contentTouchScroll: false.
   * Integer values define the axis-specific minimum amount required for scrolling momentum (default: 25).
   */
  contentTouchScroll?: boolean|number;
  /**
   * Mouse wheel support
   */
  mouseWheel?: {
    /**
     * Enable or disable content scrolling via mouse-wheel.
     */
    enable?: boolean;
    /**
     * Set the mouse-wheel scrolling amount (in pixels).
     * The default value "auto" adjusts scrolling amount according to scrollable content length.
     */
    scrollAmount?: "auto"|number;
    /**
     * Define the mouse-wheel scrolling axis when both vertical and horizontal scrollbars are present.
     * Set axis: "y" (default) for vertical or axis: "x" for horizontal scrolling.
     */
    axis?: "x"|"y";
    /**
     * Prevent the default behaviour which automatically scrolls the parent element when end
     * or beginning of scrolling is reached (same bahavior with browser’s native scrollbar).
     */
    preventDefault?: boolean;
    /**
     * Set the number of pixels one wheel notch scrolls. The default value “auto” uses the OS/browser value.
     */
    deltaFactor?: number;
    /**
     * Enable or disable mouse-wheel (delta) acceleration.
     * Setting normalizeDelta: true translates mouse-wheel delta value to -1 or 1.
     */
    normalizeDelta?:boolean;
    /**
     * Invert mouse-wheel scrolling direction.
     * Set to true to scroll down or right when mouse-wheel is turned upwards.
     */
    invert?: boolean;
    /**
     * Set the tags that disable mouse-wheel when cursor is over them.
     * Default value: ["select","option","keygen","datalist","textarea"]
     */
    disableOver?: string[];
  }
  /**
   * Keyboard support
   */
  keyboard?:{
    /**
     * Enable or disable content scrolling via keyboard.
     */
    enable?: boolean;
    /**
     * Set the keyboard arrows scrolling amount (in pixels).
     * The default value "auto" adjusts scrolling amount according to scrollable content length.
     */
    scrollAmount?: "auto"|number;
    /**
     * Define the buttons scrolling type/behavior.
     * scrollType: "stepless" – continuously scroll content while pressing the button (default)
     * scrollType: "stepped" – each button click scrolls content by a certain amount (defined in scrollAmount option above)
     */
    scrollType?: "stepless"|"stepped";
  }
  scrollButtons?: {
    /**
     * Enable or disable scroll buttons.
     */
    enable?: boolean;
    /**
     * Define the buttons scrolling type/behavior.
     * scrollType: "stepless" – continuously scroll content while pressing the button (default)
     * scrollType: "stepped" – each button click scrolls content by a certain amount (defined in scrollAmount option above)
     */
    scrollType?: "stepless"|"stepped";
    /**
     * Set a tabindex value for the buttons.
     */
    tabindex?: number;
    /**
     * Scroll buttons pixels scrolling amount, value in pixels or "auto"
     */
    scrollAmount?: "auto"|number ;
  }
  advanced?: {
    /**
     * Set the list of elements/selectors that will auto-scroll content to their position when focused.
     * For example, when pressing TAB key to focus input fields, if the field is out of the viewable area the content
     * will scroll to its top/left position (same bahavior with browser’s native scrollbar).
     * To completely disable this functionality, set autoScrollOnFocus: false.
     * Default:
     *   "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']"
     */
    autoScrollOnFocus?: boolean|string;
  }

}
interface ScrollToParameterOptions {
  /**
   * Scroll-to animation speed, value in milliseconds
   */
  scrollInertia?: number;
  /**
   * Scroll-to animation easing, values: "linear", "easeOut", "easeInOut".
   */
  scrollEasing?: string;
  /**
   * Scroll scrollbar dragger (instead of content) to a number of pixels, values: true, false
   */
  moveDragger?: boolean;
  /**
   * Set a timeout for the method (the default timeout is 60 ms in order to work with automatic scrollbar update), value in milliseconds.
   */
  timeout?: number;
  /**
   * Trigger user defined callback after scroll-to completes, value: true, false
   */
  callbacks?: boolean;
}

@Component({
  selector: 'shared-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.styl']
})
/**
 * Обработка масива сообщений
 */
export class ChatMessageComponent implements AfterViewInit, OnDestroy {

  @Input() allMessage: IMessage[];
  @Input() user: IUser;

  /**
   * HTMLClassName на который повесится скролл
   * @type {string}
   */
  private HTMLClassName:string = '.message-list';
  /**
   * scrollbarOptions - Глобальные стили на боковой скрол для сообщений
   * @Info https://www.npmjs.com/package/ngx-malihu-scrollbar
   * @Info https://github.com/malihu/malihu-custom-scrollbar-plugin
   * @Info http://manos.malihu.gr/jquery-custom-content-scroller/#configuration-section
   * @param {
   *          axis: string;
   *          theme: string;
   *          autoHideScrollbar: boolean;
   *          autoExpandScrollbar: boolean;
   *          contentTouchScroll: number;
   *          mouseWheel: {enable: boolean};
   *          keyboard: {enable: boolean};
   *          scrollButtons: {enable: boolean};
   *          advanced: {autoScrollOnFocus: boolean}
   *        } scrollbarOptions
   */
  private init_ScrollbarOptions: CustomScrollbarOptions = {
    axis: "y",
    theme: "dark",
    autoHideScrollbar: false,
    autoExpandScrollbar: true,
    contentTouchScroll: 25,
    mouseWheel: {enable:true},
    keyboard:{ enable: true },
    scrollButtons: {enable: true},
    advanced: {autoScrollOnFocus: true},
  };
  /**
   * Параметры скролинга
   * @type {scrollInertia: number; scrollEasing: string}
   */
  private scrollTo_ParameterOptions: ScrollToParameterOptions = {
    scrollInertia:1500,
    scrollEasing:"easeInOut"
  };

  // Собитие после которого нужно прокрутить
  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  constructor(
    private mScrollbarService: MalihuScrollbarService,
  ) {}

  /**
   * Создаем скролл и подписываемся на изменения в списке
   */
  ngAfterViewInit() {
    this.mScrollbarService.initScrollbar(this.HTMLClassName, this.init_ScrollbarOptions);

    // подписка на любые изменения в списке
    this.matListItems.changes.subscribe(elements => {
      this.scrollTo('bottom'); // прокрутка в низ
    });
  }

  ngOnDestroy() {
    this.mScrollbarService.destroy(this.HTMLClassName);
  }

  /**
   * Скролим в указанном направлении
   * @param {string} moveTo only (top, bottom)
   */
  scrollTo(moveTo){
    /**
     * @param {ScrollElement} HTMLClassName Елемент в каком нужно скролить
     * @param {string} moveTo  Направление куда скролим (top, bottom)
     * @param {MCustomScrollbar.ScrollToParameterOptions} scrollTo_ParameterOptions
     */
    this.mScrollbarService.scrollTo(this.HTMLClassName, moveTo, this.scrollTo_ParameterOptions)
  }


/**************** Пример авто-скролинга для стандартного скрола *****************************************/
/*

  /!*************************************************************************************************!/
  /!*********** auto-scroll для стандартного скрола *************************************************!/
  /!*************************************************************************************************!/

    // getting a reference to the overall list, which is the parent container of the list items
    // получение ссылки на общий список, который является родительским контейнером элементов списка
    // Место Которое надо прокрутить в конец/вниз
    @ViewChild(MatList, { read: ElementRef }) matList: ElementRef;

    // getting a reference to the items/messages within the list
    // получение ссылки на элементы / сообщения в списке
    // Собитие после которого нужно прокрутить
    @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

    // вызывается после того, как Angular полностью инициализировал представление компонента
    ngAfterViewInit(): void {
      // subscribing to any changes in the list of items / messages
      // подписка на любые изменения в списке товаров / сообщений
      this.matListItems.changes.subscribe(elements => {
        this.scrollToBottom(); // прокрутка в низ
      });
    }

    // auto-scroll fix: inspired by this stack overflow post
    // https://stackoverflow.com/questions/35232731/angular2-scroll-to-bottom-chat-style
    private scrollToBottom(): void {
      try {
        this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
      } catch (err) {
        console.log( err );
      }
    }

  /!*************************************************************************************************!/
  /!*************************************************************************************************!/
*/
}
