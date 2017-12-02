import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ErrorExtractor} from '../../utility/error-extractor';
import {Account} from '../../value/account/account';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService) { }

  private errorMessage: string;
  private users: Account[];
  private subscription: Subscription;

  ngOnInit() {
    this.subscription = this.userService.getUserList().subscribe(
      result => {
        this.users = result;
      },
      error => {
        this.errorMessage = ErrorExtractor.extractErrorMessage(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
