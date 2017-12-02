import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Device} from '../../value/device/device';
import {NewDevice} from '../../value/device/new-device';
import {ErrorExtractor} from '../../utility/error-extractor';
import {ActivatedRoute, Router} from '@angular/router';
import {DeviceService} from '../../service/device.service';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditDeviceComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceService
  ) { }

  id: string;
  device: Device;
  newDevice: NewDevice;

  errorMessage: string;
  submitted = false;

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.deviceService.getDevice(this.id).subscribe(
      device => {
        this.device = device;
        this.newDevice = new NewDevice(device.name, device.description);
      },
      error => {
        this.errorMessage = ErrorExtractor.extractErrorMessage(error);
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.newDevice.description === '') {
      this.newDevice.description = null;
    }
    this.deviceService.patchDevice(this.id, this.newDevice).subscribe(
      device => {
        this.router.navigateByUrl('/view-device/' + this.id);
      },
      error => {
        this.errorMessage = ErrorExtractor.extractErrorMessage(error);
        this.submitted = false;
      }
    );
  }

}
