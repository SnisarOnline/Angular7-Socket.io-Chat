import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {_localStorageService} from '../../services/_local-storage.service';

@Injectable()
export class ThemeSwitchingService {

  private Theme = [
    {name:'LightTheme', color:'rgba(242, 244, 248, 0.9)'},
    {name:'DarkTheme', color:'rgba(44, 52, 74, 0.9)'},
  ];

  selectedTheme$ = new BehaviorSubject<any>(this.Theme[0]);

  /**
   * default Theme
   */
  constructor(private localService: _localStorageService) {
    const isDarkTheme =  localService.get('Theme') || this.Theme[0];
    this.selectedTheme$.next(isDarkTheme );
  }

  /**
   * All list Themes
   * @returns {{name: string; color: string}[]}
   */
  public getAllThemes() {
    return this.Theme
  }

  /**
   * User choose theme
   * @param {object} theme
   */
  public toggleTheme(theme: object) {
    this.localService.set('Theme', theme);
    this.selectedTheme$.next(theme);
  }

}
