import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from '../../../service/authentication.service';
import {UsernamePassword} from '../../../value/authentication/username-password';
import {ErrorExtractor} from '../../../utility/error-extractor';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginFormComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  submitted = false;
  keepLoggedIn = true;
  errorMessage: string;

  model = new UsernamePassword('', '');

  ngOnInit() {
  }

  onSubmit() {
    this.errorMessage = null;
    this.submitted = true;
    this.authenticationService.login(this.model, this.keepLoggedIn)
      .subscribe(
        success => {
          // do nothing on success
        },
        error => {
          this.errorMessage = ErrorExtractor.extractErrorMessage(error);
          this.submitted = false;
        }
      );
  }

}
