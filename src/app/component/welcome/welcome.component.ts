import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WelcomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  initializationDetermined = false;
  initializationDeterminationFailed = false;
  initialized: boolean;

  authenticationDetermined = false;
  authenticated = false;

  ngOnInit() {
    this.authenticationService.isInitializedAndLoggedIn().subscribe(
    result => {
        this.initializationDetermined = true;
        this.initialized = result;
      },
      error => {
        this.initializationDetermined = false;
        this.initializationDeterminationFailed = true;
      }
    );
    this.authenticationService.authenticationStatus().subscribe(
      result => {
        console.log(result);
        this.authenticationDetermined = true;
        this.authenticated = result != null;
      }
    );
  }

  retry(): void {
    this.initializationDeterminationFailed = false;
    this.ngOnInit();
  }

}
