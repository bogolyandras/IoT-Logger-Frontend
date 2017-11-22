import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from '../../../service/authentication.service';
import {UsernamePassword} from '../../../value/authentication/username-password';

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

  model = new UsernamePassword('', '');

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.authenticationService.login(this.model, this.keepLoggedIn)
      .subscribe(
        success => {
          // do nothing on success
        },
        error => {
          this.submitted = false;
        }
      );
  }

}
