import {Injectable} from '@angular/core';

@Injectable()
export class _localStorageService {

  public get(key: string): any {
    try {
      return  JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error(e);
    }
  }

  public set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  }

  public remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(e);
    }
  }

}
