import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService, InitializationStatus} from '../../service/authentication.service';
import {Subscription} from 'rxjs/Subscription';
import {Account} from '../../value/account/account';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WelcomeComponent implements OnInit, OnDestroy {

  constructor(private authenticationService: AuthenticationService) { }

  // Strange solution to import an enum to be used in a template
  InitializationStatus = InitializationStatus;

  initializationStatus = InitializationStatus.Determining;
  account: Account;

  private initializationStatusSubscription: Subscription;
  private accountSubscription: Subscription;

  ngOnInit() {

    this.initializationStatusSubscription = this.authenticationService.observerInitializationStatus().subscribe(
      result => {
        this.initializationStatus = result;
      }
    );

    this.accountSubscription = this.authenticationService.observeAccount().subscribe(
      result => {
        this.account = result;
      }
    );

  }

  ngOnDestroy(): void {
    this.initializationStatusSubscription.unsubscribe();
    this.accountSubscription.unsubscribe();
  }

  retry(): void {
    this.authenticationService.determineIfInitialized();
  }

}
