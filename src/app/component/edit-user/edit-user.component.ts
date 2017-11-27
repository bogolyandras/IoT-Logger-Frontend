import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {UserService} from '../../service/user.service';
import {ErrorExtractor} from '../../utility/error-extractor';
import {Account, UserType} from '../../value/account/account';
import {NewAccount} from '../../value/account/new-account';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditUserComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) { }

  id: string;
  errorMessage: string;
  account: Account;
  newAccount: NewAccount;

  userTypes = Object.keys(UserType);

  password: string;
  submitted = false;

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id == null) {
      this.authenticationService.authenticationStatus().subscribe(
        account => {
          if (account != null) {
            this.account = account;
            this.newAccount = new NewAccount(account.username, '', account.firstName, account.lastName, account.userType);
          }
        }
      );
    } else {
      this.userService.getUser(this.id).subscribe(
        account => {
          if (account != null) {
            this.account = account;
            this.newAccount = new NewAccount(account.username, '', account.firstName, account.lastName, account.userType);
          }
        },
        error => {
          this.errorMessage = ErrorExtractor.extractErrorMessage(error);
        }
      );
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.newAccount.password === '') {
      this.newAccount.password = null;
    }
    let observable;
    if (this.id == null) {
      // Editing myself only
       observable = this.userService.patchMyAccount(this.newAccount);
    } else {
      // Path other account
      observable = this.userService.patchAccount(this.account.id, this.newAccount);
    }
    observable.subscribe(
      account => {
        if (account != null) {
          this.account = account;
          this.newAccount = new NewAccount(account.username, '', account.firstName, account.lastName, account.userType);
          if (this.id == null) {
            this.router.navigateByUrl('/welcome');
          } else {
            this.router.navigateByUrl('/view-user/' + this.id);
          }
        }
      },
      error => {
        this.errorMessage = ErrorExtractor.extractErrorMessage(error);
        this.submitted = false;
      }
    );
  }

}
