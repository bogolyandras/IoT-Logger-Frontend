import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from '../../../service/authentication.service';
import {Account} from '../../../value/account/account';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyAccountComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  private account: Account;
  private registrationTime: Date;

  ngOnInit() {
    this.authenticationService.authenticationStatus()
      .subscribe(
        account => {
          if (account != null) {
            this.account = account;
            this.registrationTime = new Date(account.registrationTime * 1000);
          }
    });
  }

  logout(): void {
    this.authenticationService.logout();
  }

}
