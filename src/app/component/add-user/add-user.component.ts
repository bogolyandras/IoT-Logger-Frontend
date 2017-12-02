import {Component, ViewEncapsulation} from '@angular/core';
import {NewAccount} from '../../value/account/new-account';
import {UserType} from '../../value/account/account';
import {UserService} from '../../service/user.service';
import {ErrorExtractor} from '../../utility/error-extractor';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddUserComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  submitted = false;
  errorMessage: string;

  userTypes = Object.keys(UserType);

  model = new NewAccount('', '', '', '', UserType.User);

  onSubmit() {
    this.errorMessage = null;
    this.submitted = true;
    this.userService.addAccount(this.model).subscribe(
      account => {
        this.router.navigateByUrl('/view-user/' + account.id);
      },
      error => {
        this.errorMessage = ErrorExtractor.extractErrorMessage(error);
        this.submitted = false;
      }
    );
  }

}
