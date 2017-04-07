import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.accountService.attemptLogin(this.username, this.password);
  }

}
