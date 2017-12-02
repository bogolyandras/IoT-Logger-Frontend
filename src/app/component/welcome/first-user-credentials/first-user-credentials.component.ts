import {Component, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from '../../../service/authentication.service';
import {FirstUserCredentials} from '../../../value/authentication/first-user-credentials';
import {ErrorExtractor} from '../../../utility/error-extractor';

@Component({
  selector: 'app-first-user-credentials',
  templateUrl: './first-user-credentials.component.html',
  styleUrls: ['./first-user-credentials.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FirstUserCredentialsComponent {

  constructor(private authenticationService: AuthenticationService) { }

  submitted = false;
  errorMessage: string;

  model = new FirstUserCredentials('', '', '', '', '');

  onSubmit() {
    this.errorMessage = null;
    this.submitted = true;
    this.authenticationService.initialize(this.model)
      .subscribe(
        success => {
          // nothing to do
        },
        error => {
          this.errorMessage = ErrorExtractor.extractErrorMessage(error);
          this.submitted = false;
        }
      );
  }

}
