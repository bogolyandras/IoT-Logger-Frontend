import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {environment} from '../environments/environment';
import 'rxjs/add/operator/toPromise';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {FirstUserCredentials} from './first-user-credentials';

@Injectable()
export class AccountService {

  firstUserInitialized: BehaviorSubject<boolean> = new BehaviorSubject(null);
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private jwtToken: string;

  private static handleToken(response: Response, accountService: AccountService): Promise<string> {
    const jwtToken = response.json().token;
    localStorage.setItem('iotlogger_token', jwtToken);
    accountService.loggedIn.next(true);
    accountService.jwtToken = jwtToken;
    return Promise.resolve('Login success!');
  }

  private static handleError(response: Response): Promise<string> {
    return Promise.reject(response.json().message);
  }

  constructor(private http: Http) {

    const token = window.localStorage.getItem('iotlogger_token');
    if (token != null) {
      this.jwtToken = token;
      this.loggedIn.next(true);
    } else {
      this.jwtToken = null;
      this.loggedIn.next(false);
    }

    // Finding out the first User state
    http.get(environment.backend + '/account/firstAccount')
      .toPromise()
      .then((response) => {
        this.firstUserInitialized.next(response.json().initialized);
      });
  }

  public isFirstUserInitialized(): Observable<boolean> {
    return this.firstUserInitialized.asObservable();
  }

  public initializeFirstUser(firstUserCredentials: FirstUserCredentials): Promise<string> {
    return this.http.post(environment.backend + '/account/firstAccount',
      JSON.stringify(firstUserCredentials),
      {headers: new Headers({'Content-Type': 'application/json'})})
      .toPromise()
      .then((response) => {
        return AccountService.handleToken(response, this);
      })
      .catch(AccountService.handleError);
  }

  public attemptLogin(username: string, password: string): Promise<string> {
    return this.http.post(environment.backend + '/authentication',
      JSON.stringify({'username': username, 'password': password}),
      {headers: new Headers({'Content-Type': 'application/json'})})
      .toPromise()
      .then((response) => {
        return AccountService.handleToken(response, this);
      })
      .catch(AccountService.handleError);
  }

  public createAuthorizationHeader(): Headers {
    return this.appendAuthorizationHeader(new Headers());
  }

  public appendAuthorizationHeader(headers: Headers): Headers {
    headers.append('Authorization', 'Bearer ' + this.jwtToken);
    return headers;
  }

}
