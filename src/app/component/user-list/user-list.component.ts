import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ErrorExtractor} from '../../utility/error-extractor';
import {Account} from '../../value/account/account';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService) { }

  errorMessage: string;
  users: Account[];

  ngOnInit() {
    this.userService.getUserList().subscribe(
      result => {
        this.users = result;
      },
      error => {
        this.errorMessage = ErrorExtractor.extractErrorMessage(error);
      }
    );
  }

}
