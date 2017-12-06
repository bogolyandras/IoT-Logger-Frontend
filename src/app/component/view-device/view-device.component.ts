import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Device} from '../../value/device/device';
import {ActivatedRoute, Router} from '@angular/router';
import {DeviceService} from '../../service/device.service';
import {ErrorExtractor} from '../../utility/error-extractor';
import {LogService} from '../../service/log.service';
import {NewLog} from '../../value/log/new-log';
import {LogAggregationByType, LogAggregationRequest} from '../../value/log/log-aggregation-request';
import {DateUtility} from '../../utility/date-utility';
import {LogAggregation, MetricContainer} from '../../value/log/log-aggregation';

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
  showQueryLogsForm = false;
  newLogErrorMessage: string;
  logSubmitted = false;

  private _24HoursInMilliseconds = 86400000;
  private componentInitializationDate = new Date();
  newLogDate = DateUtility.extractDate(this.componentInitializationDate);
  newLogTime = DateUtility.extractTime(this.componentInitializationDate);
  model = new NewLog(null, null, null, null);

  queryLogFromDate = DateUtility.extractDate(new Date(this.componentInitializationDate.getTime() - 365 * this._24HoursInMilliseconds));
  queryLogFromTime = DateUtility.extractTime(new Date(this.componentInitializationDate.getTime() - 365 * this._24HoursInMilliseconds));
  queryLogToDate = DateUtility.extractDate(new Date(this.componentInitializationDate.getTime() + this._24HoursInMilliseconds));
  queryLogToTime = DateUtility.extractTime(new Date(this.componentInitializationDate.getTime() + this._24HoursInMilliseconds));

  logAggregationTypes = Object.keys(LogAggregationByType);
  logAggregationRequestModel = new LogAggregationRequest(new Date().getTimezoneOffset(), LogAggregationByType.Daily, null, null);
  logAggregationErrorMessage: string;
  aggregationSubmitted = false;

  logAggregation: Array<{ key: string, value: MetricContainer }>;

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

  queryLogs(): void {
    this.showQueryLogsForm = true;
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
    this.logAggregationErrorMessage = null;
    this.logAggregation = null;
    this.logAggregationRequestModel.lowTimestampFilter = DateUtility.timeStampFromDateAndTime(this.queryLogFromDate, this.queryLogFromTime);
    this.logAggregationRequestModel.highTimestampFilter = DateUtility.timeStampFromDateAndTime(this.queryLogToDate, this.queryLogToTime);
    this.logService.getLogAggregation(this.id, this.logAggregationRequestModel).subscribe(
      result => {
        this.aggregationSubmitted = false;
        this.logAggregation = [];
        Object.keys(result.logs).map(
          (key) => this.logAggregation.push({key: key, value: result.logs[key]})
        );

      },
      error => {
        this.logAggregationErrorMessage = ErrorExtractor.extractErrorMessage(error);
        this.aggregationSubmitted = false;
      }
    );
  }

}
