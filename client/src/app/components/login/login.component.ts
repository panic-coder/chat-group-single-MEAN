import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }
  hide = true;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  ngOnInit() {
  }

  login() {
    console.log("login");

  }

  registration() {
    this.router.navigate(['registration']);
  }

  getErrorMessageUsername() {
    return this.username.hasError('required') ? 'Username is a required field' :
    '';
  }

  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'Password is a required field' :
    '';
  }

}
