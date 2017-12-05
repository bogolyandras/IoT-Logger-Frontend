import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {UserType} from '../../value/account/account';
import {Subscription} from 'rxjs/Subscription';
import {Device} from '../../value/device/device';
import {DeviceService} from '../../service/device.service';
import {ErrorExtractor} from '../../utility/error-extractor';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DeviceListComponent implements OnInit, OnDestroy {

  constructor(
    private authenticationService: AuthenticationService,
    private deviceService: DeviceService) { }

  errorMessage: string;
  devices: Device[];

  isAdministrator = false;
  justMyDevices = true;

  private subscription: Subscription;

  ngOnInit(): void {
    this.subscription = this.authenticationService.observeAccount().subscribe(
      account => {
        if (account != null) {
          this.isAdministrator = account.userType === UserType.Administrator;
        } else {
          this.isAdministrator = false;
        }
      });

    this.getDevices();

  }

  getDevices(): void {

    if (this.justMyDevices) {
      this.deviceService.getMyDevices().subscribe(
        result => {
          this.devices = result;
        },
        error => {
          this.errorMessage = ErrorExtractor.extractErrorMessage(error);
        }
      );
    } else {
      this.deviceService.getAllDevices().subscribe(
        result => {
          this.devices = result;
        },
        error => {
          this.errorMessage = ErrorExtractor.extractErrorMessage(error);
        }
      );
    }

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
