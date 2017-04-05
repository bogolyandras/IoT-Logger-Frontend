import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
  }

}
