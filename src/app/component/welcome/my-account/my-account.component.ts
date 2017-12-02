import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from '../../../service/authentication.service';
import {Account} from '../../../value/account/account';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyAccountComponent implements OnInit, OnDestroy {

  constructor(private authenticationService: AuthenticationService) { }

  private account: Account;

  private subscription: Subscription;

  ngOnInit() {
    this.subscription = this.authenticationService.observeAccount()
      .subscribe(
        account => {
          this.account = account;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout(): void {
    this.authenticationService.logout();
  }

}
