import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from "rxjs/operators";
import {environment} from "../../../../environments/environment";
import {of} from "rxjs/internal/observable/of";

@Injectable()
export class ClientChatHttpService {

  private defaultUrl = 'chat/';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) {
    // console.log('CHAT-HTTP SERVICE INIT');
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private superHandleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error('Full description of the BUG: ', error);

      this.log(`${operation} ERROR : ${error.message}`);

      return of(result as T);
    };
  }
  private log(message){
    console.info(`ChatService: ${message}`);
  }
  private getUrl(id=''){
    if (id = '') {
      return environment.baseUrl + environment.apiUrl + this.defaultUrl;
    } else {
      return environment.baseUrl + environment.apiUrl + this.defaultUrl + id + '/';
    }
  }

  list(): Observable<any> {
    return this.httpClient.get<any> (this.getUrl(), this.httpOptions)
      .pipe(
        tap(_ => this.log('GET ALL MESSAGE')),
        catchError(this.superHandleError('list'))
      );
  }

  create (data: any): Observable<any> {
    return this.httpClient.post<any> (this.getUrl(), data, this.httpOptions)
      .pipe(
        tap(() => this.log('CREATE NEW MESSAGE')),
        catchError(this.superHandleError('create'))
      );
  }

  edit (data: any, id: string): Observable<any> {
    return this.httpClient.patch( this.getUrl(id), data, this.httpOptions )
      .pipe(
        tap(_ => this.log('CHANGES REQUEST')),
        catchError(this.superHandleError('edit'))
      );
  }

  remove (id: string): Observable<any> {
    return this.httpClient.delete(this.getUrl(id), this.httpOptions)
      .pipe(
        tap( ()=> this.log('DELL MESSAGE')),
        catchError(this.superHandleError('remove'))
      );
  }
}
