import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ThemeSwitchingService} from "./shared/component/themeToggle/themeSwitching.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';

  constructor(
    private themeSwitching: ThemeSwitchingService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    /**
     * subscription to changes in color scheme
     * @type {Subscription}
     */
    this.themeSwitching.selectedTheme$
      .subscribe((theme) => {
        this.renderer.removeAttribute(document.body, 'class');
        this.renderer.addClass(document.body, theme.name);
      });
  }


  ngOnDestroy() {
    this.themeSwitching.selectedTheme$.unsubscribe();
  }

}
