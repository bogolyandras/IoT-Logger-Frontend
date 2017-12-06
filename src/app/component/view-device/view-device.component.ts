import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Device} from '../../value/device/device';
import {ActivatedRoute, Router} from '@angular/router';
import {DeviceService} from '../../service/device.service';
import {ErrorExtractor} from '../../utility/error-extractor';
import {LogService} from '../../service/log.service';
import {NewLog} from '../../value/log/new-log';
import {LogAggregationByType, LogAggregationRequest} from '../../value/log/log-aggregation-request';
import {DateUtility} from '../../utility/date-utility';

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
  logSubmitted = false;

  private componentInitializationDate = new Date();
  newLogDate = DateUtility.extractDate(this.componentInitializationDate);
  newLogTime = DateUtility.extractTime(this.componentInitializationDate);
  model = new NewLog(null, null, null, null);

  logAggregationTypes = Object.keys(LogAggregationByType);
  logAggregationRequestModel = new LogAggregationRequest(new Date().getTimezoneOffset(), LogAggregationByType.Daily, null, null);
  logAggregationErrorMessage: string;
  aggregationSubmitted = false;

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

  onSubmitLog(): void {
    this.newLogErrorMessage = null;
    this.logSubmitted = true;
    this.model.timestamp = DateUtility.timeStampFromDateAndTime(this.newLogDate, this.newLogTime);
    this.logService.storeLog(this.id, this.model).subscribe(
      account => {
        this.newLogErrorMessage = null;
        this.logSubmitted = false;

        const date = new Date();
        this.newLogDate = DateUtility.extractDate(date);
        this.newLogTime = DateUtility.extractTime(date);
        this.model = new NewLog(null, null, null, null);
      },
      error => {
        this.newLogErrorMessage = ErrorExtractor.extractErrorMessage(error);
        this.logSubmitted = false;
      }
    );
  }

  onQueryLogs(): void {
    this.aggregationSubmitted = true;
  }

}
