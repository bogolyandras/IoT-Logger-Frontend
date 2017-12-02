import {Component, ViewEncapsulation} from '@angular/core';
import {DeviceService} from '../../service/device.service';
import {NewDevice} from '../../value/device/new-device';
import {ErrorExtractor} from '../../utility/error-extractor';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddDeviceComponent {

  constructor(
    private deviceService: DeviceService,
    private router: Router) { }

  submitted = false;
  errorMessage: string;

  model = new NewDevice('', '');

  onSubmit() {
    this.errorMessage = null;
    this.submitted = true;
    if (this.model.description === '') {
      this.model.description = null;
    }
    this.deviceService.addDevice(this.model).subscribe(
      device => {
        this.router.navigateByUrl('/view-device/' + device.id);
      },
      error => {
        this.errorMessage = ErrorExtractor.extractErrorMessage(error);
        this.submitted = false;
      }
    );
  }

}
