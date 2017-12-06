import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {NewLog} from '../value/log/new-log';
import {Observable} from 'rxjs/Observable';
import {Log} from '../value/log/log';
import {environment} from '../../environments/environment';
import {LogAggregationRequest} from '../value/log/log-aggregation-request';
import {LogAggregation} from '../value/log/log-aggregation';

@Injectable()
export class LogService {

  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  storeLog(deviceId: string, newLog: NewLog): Observable<Log> {
    return this.httpClient.post<Log>(
      environment.backendUrl + '/devices/byId/' + deviceId + '/logs',
      newLog,
      this.authenticationService.authHeaderWithJsonContentType()
    );
  }

  getLogAggregation(deviceId: string, logAggregationRequest: LogAggregationRequest): Observable<LogAggregation> {
    return this.httpClient.post<LogAggregation>(
      environment.backendUrl + '/devices/byId/' + deviceId + '/logs/aggregate',
      logAggregationRequest,
      this.authenticationService.authHeaderWithJsonContentType()
    );
  }

}
