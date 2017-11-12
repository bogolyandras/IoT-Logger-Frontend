import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {FirstUserStatus} from './value/authentication/first-user-status';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  private initialized: FirstUserStatus;
  private _initialized: BehaviorSubject<FirstUserStatus>;

  isInitialized(): Observable<FirstUserStatus> {
    if (this._initialized == null) {
      this._initialized = new BehaviorSubject<FirstUserStatus>(null);
      this.httpClient.get<FirstUserStatus>(environment.backendUrl + '/accounts/firstAccount')
        .subscribe(result => {
          this.initialized = result;
          this._initialized.next(this.initialized);
        });
    }
    return this._initialized;
  }

}
