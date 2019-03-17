import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

/**
 * передача события через подписку в RxJs/Observable
 */
@Injectable()
export class _eventService {
  private EventVoid = new Subject<any>();

  getEvent(): Observable<any> {
    // console.log('EVENT getOption -> return ', this.EventVoid.asObservable() );
    return this.EventVoid.asObservable();
  }

  setEvent(value: any) {
    // console.log('EVENT setOption -> next ', value);
    this.EventVoid.next(value);
  }
}

