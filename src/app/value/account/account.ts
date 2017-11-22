export class Account {

  constructor(
    public id: string,
    public username: string,
    public firstName: string,
    public lastName: string,
    public userType: UserType,
    public registrationTime: number
  ) { }

}

export enum UserType {
  User = 'User',
  Administrator = 'Administrator'
}
