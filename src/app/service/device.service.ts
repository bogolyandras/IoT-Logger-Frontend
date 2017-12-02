import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs/Observable';
import {Device} from '../value/device/device';
import {environment} from '../../environments/environment';
import {NewDevice} from '../value/device/new-device';

@Injectable()
export class DeviceService {

  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  getMyDevices(): Observable<Device[]> {
    return this.httpClient.get<Device[]>(environment.backendUrl + '/devices', this.authenticationService.authHeader());
  }

  getAllDevices(): Observable<Device[]> {
    return this.httpClient.get<Device[]>(environment.backendUrl + '/devices/all', this.authenticationService.authHeader());
  }

  getDevice(id: string): Observable<Device> {
    return this.httpClient.get<Device>(environment.backendUrl + '/devices/byId/' + id, this.authenticationService.authHeader());
  }

  addDevice(newDevice: NewDevice): Observable<Device> {
    return this.httpClient.post<Device>(
      environment.backendUrl + '/devices',
      newDevice,
      this.authenticationService.authHeaderWithJsonContentType());
  }

  patchDevice(id: string, newDevice: NewDevice): Observable<Device> {
    return this.httpClient.patch<Device>(
      environment.backendUrl + '/devices/byId/' + id,
      newDevice,
      this.authenticationService.authHeaderWithJsonContentType());
  }

  deleteDevice(id: string): Observable<Object> {
    return this.httpClient.delete<Object>(
      environment.backendUrl + '/devices/byId/' + id,
      this.authenticationService.authHeaderWithTextResponse()
    );
  }

}
