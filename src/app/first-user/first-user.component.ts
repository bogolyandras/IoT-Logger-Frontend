import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';
import {FirstUserCredentials} from '../first-user-credentials';

@Component({
  selector: 'app-first-user',
  templateUrl: './first-user.component.html',
  styleUrls: ['./first-user.component.css']
})
export class FirstUserComponent implements OnInit {

  serverPassword: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.accountService.initializeFirstUser(
      new FirstUserCredentials(this.serverPassword, this.username, this.password, this.firstName, this.lastName)
    );
  }

}
