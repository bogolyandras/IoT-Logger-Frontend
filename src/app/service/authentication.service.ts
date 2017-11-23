import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {FirstUserStatus} from '../value/authentication/first-user-status';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FirstUserCredentials} from '../value/authentication/first-user-credentials';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {JwtToken} from '../value/authentication/jwt-token';
import {Subject} from 'rxjs/Subject';
import {UsernamePassword} from '../value/authentication/username-password';
import {Account} from '../value/account/account';

@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {
    this.isInitializedAndLoggedIn();
  }

  // Value that holds if the first user has been created or not
  private initialized: boolean;
  private _initialized = new ReplaySubject<boolean>(1);

  // JWT token user for every request that needs authentication
  private authenticationToken: string;
  private authenticationAccount = new ReplaySubject<Account>(1);

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  authHeaderWithJsonContentType(): Object {
    if (this.authenticationToken == null) {
      throw new Error('No authentication token!');
    }
    return {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.authenticationToken
        }
      )
    };
  }

  isInitializedAndLoggedIn(): Observable<boolean> {
    if (this.initialized == null) {
      const subject = new Subject<boolean>();
      this.httpClient.get<FirstUserStatus>(environment.backendUrl + '/accounts/firstAccount')
        .subscribe(result => {
          this.initialized = result.initialized;
          this._initialized.next(result.initialized);
          subject.next(result.initialized);
          this.authenticationToken = localStorage.getItem('iotlogger_token');
          if (this.authenticationToken == null) {
            this.authenticationAccount.next(null);
          } else {
            this.attemptLoginWithStoredToken();
          }
        }, error => {
          subject.error(error);
        });
      return subject;
    } else {
      return this._initialized;
    }
  }

  isInitialized(): Observable<boolean> {
    return this._initialized;
  }

  initialize(firstUserCredentials: FirstUserCredentials): Observable<object> {
    const subject = new Subject<object>();
    this.httpClient.post<JwtToken>(environment.backendUrl + '/accounts/firstAccount', firstUserCredentials, this.httpOptions)
      .subscribe(
        result => {
          this.initialized = true;
          this._initialized.next(true);
          this.authenticationToken = result.token;
          localStorage.setItem('iotlogger_token', result.token);
          this.attemptLoginWithStoredToken();
          subject.next(result);
        },
        error => {
          subject.error(error);
        }
      );
    return subject;
  }

  authenticationStatus(): Observable<Account> {
    return this.authenticationAccount;
  }

  login(usernamePassword: UsernamePassword, keepLoggedIn: boolean) {
    const subject = new Subject<boolean>();
    this.httpClient.post<JwtToken>(environment.backendUrl + '/authentication', usernamePassword, this.httpOptions)
      .subscribe(
        result => {
          this.authenticationToken = result.token;
          this.attemptLoginWithStoredToken();
          if (keepLoggedIn) {
            localStorage.setItem('iotlogger_token', result.token);
          }
          subject.complete();
        },
        error => {
          subject.error(error);
        }
      );
    return subject;
  }

  private attemptLoginWithStoredToken(): void {
    this.httpClient.get<Account>(environment.backendUrl + '/accounts/my', this.authHeaderWithJsonContentType())
      .subscribe(
        account => {
          this.authenticationAccount.next(account);
        },
        error => {
          this.authenticationAccount.next(null);
          localStorage.removeItem('iotlogger_token');
        }
      );
  }

  logout(): void {
    localStorage.removeItem('iotlogger_token');
    this.authenticationToken = null;
    this.authenticationAccount.next(null);
  }

}
