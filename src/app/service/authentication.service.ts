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

@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  private initialized: boolean;
  private _initialized = new ReplaySubject<boolean>(1);

  private authenticationToken: string;
  private _authenticationStatus = new ReplaySubject<boolean>(1);

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  isInitialized(): Observable<boolean> {
    if (this.initialized == null) {
      const reply = new Subject<boolean>();
      this.httpClient.get<FirstUserStatus>(environment.backendUrl + '/accounts/firstAccount')
        .subscribe(result => {
          this.initialized = result.initialized;
          this._initialized.next(result.initialized);
          reply.next(result.initialized);
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

  login(usernamePassword: UsernamePassword) {
    const subject = new Subject<boolean>();
    this.httpClient.post<JwtToken>(environment.backendUrl + '/authentication', usernamePassword, this.httpOptions)
      .subscribe(
        result => {
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

}
