import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WelcomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  initializationDetermined = false;
  initialized: boolean;

  ngOnInit() {
    this.authenticationService.isInitialized().subscribe(
      result => {
        if (result != null) {
          this.initializationDetermined = true;
          this.initialized = result.initialized;
        }
      }
    );
  }

}
