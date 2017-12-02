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
    this.initializationStatus = InitializationStatus.FailedToDetermine;
    this.authenticationToken = localStorage.getItem('iotlogger_token');
    this.account.next(null);
    this.determineIfInitialized();
  }

  // Value that holds if the first user has been created or not
  private initializationStatus: InitializationStatus;
  private _initializationStatus = new ReplaySubject<InitializationStatus>(1);

  // JWT token user for every request that needs authentication
  private authenticationToken: string;
  private account = new ReplaySubject<Account>(1);

  private jsonHttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  authHeader(): Object {
    if (this.authenticationToken == null) {
      throw new Error('No authentication token!');
    }
    return {
      headers: new HttpHeaders(
        {
          'Authorization': 'Bearer ' + this.authenticationToken
        }
      )
    };
  }

  authHeaderWithTextResponse(): Object {
    if (this.authenticationToken == null) {
      throw new Error('No authentication token!');
    }
    return {
      headers: new HttpHeaders(
        {
          'Authorization': 'Bearer ' + this.authenticationToken,
        }
      ),
    responseType: 'text'
    };
  }

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

  determineIfInitialized(): void {
    if (this.initializationStatus !== InitializationStatus.FailedToDetermine) {
      throw new Error('Cannot invoke initialization determination if current process is running!');
    }
    this.initializationStatus = InitializationStatus.Determining;
    this._initializationStatus.next(this.initializationStatus);
    this.httpClient.get<FirstUserStatus>(environment.backendUrl + '/accounts/firstAccount')
      .subscribe(
        result => {
          if (result.initialized) {
            // If it is initialized, we should determinde if we already logged in!
            this.initializationStatus = InitializationStatus.Initialized;
            this._initializationStatus.next(this.initializationStatus);
            this.determineIfLoggedIn();
          } else {
            // We should initialize the server this case
            this.initializationStatus = InitializationStatus.NotInitialized;
            this._initializationStatus.next(this.initializationStatus);
          }
        }, error => {
          // Maybe we can't access the server
          this.initializationStatus = InitializationStatus.FailedToDetermine;
          this._initializationStatus.next(this.initializationStatus);
        }
      );
  }

  determineIfLoggedIn(): void {
    if (this.authenticationToken != null) {
      this.attemptLoginWithStoredToken();
    }
  }

  attemptLoginWithStoredToken(): void {
    this.httpClient.get<Account>(environment.backendUrl + '/accounts/my', this.authHeaderWithJsonContentType())
      .subscribe(
        account => {
          this.account.next(account);
        },
        error => {
          this.account.next(null);
          this.authenticationToken = null;
          localStorage.removeItem('iotlogger_token');
        }
      );
  }

  observeAccount(): Observable<Account> {
    return this.account;
  }

  observerInitializationStatus(): Observable<InitializationStatus> {
    return this._initializationStatus;
  }

  initialize(firstUserCredentials: FirstUserCredentials): Observable<JwtToken> {
    const subject = new Subject<JwtToken>();
    this.httpClient.post<JwtToken>(environment.backendUrl + '/accounts/firstAccount', firstUserCredentials, this.jsonHttpOptions)
      .subscribe(
        result => {
          this.initializationStatus = InitializationStatus.Initialized;
          this._initializationStatus.next(this.initializationStatus);

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

  login(usernamePassword: UsernamePassword, keepLoggedIn: boolean) {
    const subject = new Subject<boolean>();
    this.httpClient.post<JwtToken>(environment.backendUrl + '/authentication', usernamePassword, this.jsonHttpOptions)
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

  logout(): void {
    localStorage.removeItem('iotlogger_token');
    this.authenticationToken = null;
    this.account.next(null);
  }

}

export enum InitializationStatus {
  Determining, FailedToDetermine, Initialized, NotInitialized
}
