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

  constructor(private httpClient: HttpClient) { }

  // Value that holds if the first user has been created or not
  private initialized: boolean;
  private _initialized = new ReplaySubject<boolean>(1);

  // JWT token user for every request that needs authentication
  private authenticationToken: string;
  private _authenticationStatus = new ReplaySubject<boolean>(1);

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  authHeaderWithJsonContentType(): any {
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
      const reply = new Subject<boolean>();
      this.httpClient.get<FirstUserStatus>(environment.backendUrl + '/accounts/firstAccount')
        .subscribe(result => {
          this.initialized = result.initialized;
          this._initialized.next(result.initialized);
          reply.next(result.initialized);

          const authenticationToken = localStorage.getItem('iotlogger_token');
          if (authenticationToken == null) {
            console.log('a');
            this._authenticationStatus.next(false);
          } else {
            this.authenticationToken = authenticationToken;
            console.log('b');
            this.httpClient.get<Account>(environment.backendUrl + '/accounts/my', this.authHeaderWithJsonContentType())
              .subscribe(
                account => {
                  console.log('c');
                  this._authenticationStatus.next(true);
                },
                error => {
                  this._authenticationStatus.next(false);
                  localStorage.removeItem('iotlogger_token');
                }
              );
          }

        }, error => {
          reply.error(null);
        });
      return reply;
    } else {
      return this._initialized;
    }
  }

  initialize(firstUserCredentials: FirstUserCredentials): Observable<boolean> {
    const subject = new Subject<boolean>();
    this.httpClient.post<JwtToken>(environment.backendUrl + '/accounts/firstAccount', firstUserCredentials, this.httpOptions)
      .subscribe(
        result => {
          this.initialized = true;
          this._initialized.next(true);
          this.authenticationToken = result.token;
          this._authenticationStatus.next(true);
          subject.complete();
        },
        error => {
          subject.error(null);
        }
      );
    return subject;
  }

  authenticationStatus(): Observable<boolean> {
    return this._authenticationStatus;
  }

  login(usernamePassword: UsernamePassword, keepLoggedIn: boolean) {
    const subject = new Subject<boolean>();
    this.httpClient.post<JwtToken>(environment.backendUrl + '/authentication', usernamePassword, this.httpOptions)
      .subscribe(
        result => {
          this.authenticationToken = result.token;
          this._authenticationStatus.next(true);
          if (keepLoggedIn) {
            localStorage.setItem('iotlogger_token', result.token);
          }
          subject.complete();
        },
        error => {
          subject.error(null);
        }
      );
    return subject;
  }

  logout(): void {
    localStorage.removeItem('iotlogger_token');
    this.authenticationToken = null;
    this._authenticationStatus.next(false);
  }

}
