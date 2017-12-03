import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Device} from '../../value/device/device';
import {ActivatedRoute, Router} from '@angular/router';
import {DeviceService} from '../../service/device.service';
import {ErrorExtractor} from '../../utility/error-extractor';
import {LogService} from '../../service/log.service';
import {NewLog} from '../../value/log/new-log';

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
    private deviceService: DeviceService,
    private logService: LogService
  ) { }

  id: string;
  device: Device;

  errorMessage: string;

  showNewLogForm = false;
  newLogErrorMessage: string;
  submitted = false;

  model = new NewLog(null, null, null, null);

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

  deleteDevice(): void {
    this.deviceService.deleteDevice(this.id).subscribe(
      success => {
        this.router.navigateByUrl('/device-list');
      },
      error => {
        this.errorMessage = ErrorExtractor.extractErrorMessage(error);
      }
    );
  }

  addLog(): void {
    this.showNewLogForm = true;
  }

  onSubmit() {
    this.newLogErrorMessage = null;
    this.submitted = true;
    this.logService.storeLog(this.id, this.model).subscribe(
      account => {
        this.newLogErrorMessage = null;
        this.submitted = false;
        this.model = new NewLog(null, null, null, null);
      },
      error => {
        this.newLogErrorMessage = ErrorExtractor.extractErrorMessage(error);
        this.submitted = false;
      }
    );
  }

}
