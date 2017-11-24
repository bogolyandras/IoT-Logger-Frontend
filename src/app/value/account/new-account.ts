import {UserType} from './account';

export class NewAccount {

  constructor(
    public username: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public userType: UserType
  ) { }

}
