import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {Account} from '../../value/account/account';
import {ErrorExtractor} from '../../utility/error-extractor';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewUserComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  id: string;
  errorMessage: string;
  account: Account;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(this.id).subscribe(
      account => {
        this.account = account;
      },
      error => {
        this.errorMessage = ErrorExtractor.extractErrorMessage(error);
      }
    );
  }

  deleteUser() {
    this.userService.deleteAccount(this.id)
      .subscribe(
        success => {
          this.router.navigateByUrl('/user-list');
        },
        error => {
          this.errorMessage = ErrorExtractor.extractErrorMessage(error);
        }
      );
  }

}
