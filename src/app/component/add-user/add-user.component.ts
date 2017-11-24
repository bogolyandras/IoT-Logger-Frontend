import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NewAccount} from '../../value/account/new-account';
import {UserType} from '../../value/account/account';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddUserComponent implements OnInit {

  constructor(private userService: UserService) { }

  submitted = false;
  errorMessage: string;

  userTypes = Object.keys(UserType);

  model = new NewAccount('', '', '', '', UserType.User);

  ngOnInit() {
  }

  onSubmit() {
    this.errorMessage = null;
    this.submitted = true;
  }

}
