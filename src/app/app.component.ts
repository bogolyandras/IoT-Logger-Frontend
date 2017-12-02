import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from './service/authentication.service';
import {UserType} from './value/account/account';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private authenticationService: AuthenticationService) { }

  private loggedIn: boolean;
  private isAdministrator: boolean;

  private subscription: Subscription;

  ngOnInit() {
    this.subscription = this.authenticationService.observeAccount().subscribe(
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
