import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from './authentication.service';
import {environment} from '../../environments/environment';
import {Account} from '../value/account/account';
import {NewAccount} from '../value/account/new-account';

@Injectable()
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  getUserList(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(environment.backendUrl + '/accounts', this.authenticationService.authHeader());
  }

  getUser(id: String): Observable<Account> {
    return this.httpClient.get<Account>(environment.backendUrl + '/accounts/byId/' + id, this.authenticationService.authHeader());
  }

  addAccount(newAccount: NewAccount): Observable<Account> {
    return this.httpClient.post<Account>(
      environment.backendUrl + '/accounts',
      newAccount,
      this.authenticationService.authHeaderWithJsonContentType()
    );
  }

  patchMyAccount(newAccount: NewAccount): Observable<Account> {
    return this.httpClient.patch<Account>(
      environment.backendUrl + '/accounts/my',
      newAccount,
      this.authenticationService.authHeaderWithJsonContentType()
    );
  }

  patchAccount(identifier: string, newAccount: NewAccount): Observable<Account> {
    return this.httpClient.patch<Account>(
      environment.backendUrl + '/accounts/byId/' + identifier,
      newAccount,
      this.authenticationService.authHeaderWithJsonContentType()
    );
  }

  deleteAccount(id: String): Observable<Object> {
    return this.httpClient.delete<Object>(
      environment.backendUrl + '/accounts/byId/' + id,
      this.authenticationService.authHeaderWithTextResponse()
    );
  }

}
