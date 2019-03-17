import {Component, OnInit} from '@angular/core';
import {ThemeSwitchingService} from './themeSwitching.service';

@Component({
  selector: 'shared-themeToggle',
  templateUrl: './themeToggle.component.html',
  styleUrls: ['./themeToggle.component.styl']
})
export class ThemeToggleComponent implements OnInit{
  columns = 2;
  checkTheme = {};
  allThemes: object[];

  matRipple = {
    centered: true,
    disabled: false,
    unbounded: true,
    radius: 1400
  };

  constructor( private themeSwitching: ThemeSwitchingService ) {}

  ngOnInit(){
    this.themeSwitching.selectedTheme$
      .subscribe((theme) => {
        this.checkTheme = theme;
      });

    this.allThemes = this.themeSwitching.getAllThemes();
  }

  public toggleTheme( theme ): void {
    this.checkTheme = theme;
    this.themeSwitching.toggleTheme(theme);
  }

}
