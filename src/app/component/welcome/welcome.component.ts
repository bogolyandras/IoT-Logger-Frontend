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

  ngOnInit() {
    this.authenticationService.isInitialized().subscribe(
    result => {
        this.initializationDetermined = true;
        this.initialized = result;
      },
      error => {
        this.initializationDetermined = false;
        this.initializationDeterminationFailed = true;
      }
    );
  }

}
