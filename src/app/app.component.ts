import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './service/authentication.service';
import {UserType} from './value/account/account';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  private loggedIn: boolean;
  private isAdministrator: boolean;

  ngOnInit() {
    this.authenticationService.authenticationStatus().subscribe(
      account => {
        if (account != null) {
          this.loggedIn = true;
          if (account.userType === UserType.Administrator) {
            this.isAdministrator = true;
          } else {
            this.isAdministrator = false;
          }
        } else {
          this.loggedIn = false;
          this.isAdministrator = false;
        }
      });
  }

}
