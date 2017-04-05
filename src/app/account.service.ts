import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {environment} from '../environments/environment';
import 'rxjs/add/operator/toPromise';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {FirstUserCredentials} from './first-user-credentials';

@Injectable()
export class AccountService {

  firstUserInitialized: BehaviorSubject<boolean> = new BehaviorSubject(null);

  constructor(private http: Http) {
    http.get(environment.backend + '/firstUser')
      .toPromise()
      .then((response) => {
        this.firstUserInitialized.next(response.json().initialized);
      });
  }

  public isFirstUserInitialized(): Observable<boolean> {
    return this.firstUserInitialized.asObservable();
  }

  public initializeFirstUser(firstUserCredentials: FirstUserCredentials): void {
    console.log(firstUserCredentials);
    this.http.put(environment.backend + '/firstUser',
      JSON.stringify(firstUserCredentials),
      {headers: new Headers({'Content-Type': 'application/json'})})
      .toPromise()
      .then((response) => {
      });
  }

}
