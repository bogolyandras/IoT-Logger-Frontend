import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Device} from '../../value/device/device';
import {ActivatedRoute, Router} from '@angular/router';
import {DeviceService} from '../../service/device.service';
import {ErrorExtractor} from '../../utility/error-extractor';

@Component({
  selector: 'app-view-device',
  templateUrl: './view-device.component.html',
  styleUrls: ['./view-device.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewDeviceComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceService) { }

  id: string;
  errorMessage: string;
  device: Device;

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.deviceService.getDevice(this.id).subscribe(
      device => {
        this.device = device;
      },
      error => {
        this.errorMessage = ErrorExtractor.extractErrorMessage(error);
      }
    );
  }

  deleteDevice() {
    this.deviceService.deleteDevice(this.id).subscribe(
      success => {
        this.router.navigateByUrl('/device-list');
      },
      error => {
        this.errorMessage = ErrorExtractor.extractErrorMessage(error);
      }
    );
  }

}
