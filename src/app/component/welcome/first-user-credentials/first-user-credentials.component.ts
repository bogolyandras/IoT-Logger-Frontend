import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from '../../../service/authentication.service';
import {FirstUserCredentials} from '../../../value/authentication/first-user-credentials';

@Component({
  selector: 'app-first-user-credentials',
  templateUrl: './first-user-credentials.component.html',
  styleUrls: ['./first-user-credentials.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FirstUserCredentialsComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  submitted = false;

  model = new FirstUserCredentials('', '', '', '', '');

  onSubmit() {
    this.submitted = true;
    this.authenticationService.initialize(this.model)
      .subscribe(
        success => {
          // nothing to do
        },
        error => {
          this.submitted = false;
        }
      );
  }

  ngOnInit() {
  }

}
