import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private router: Router) { }
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  ngOnInit() {
  }

  login() {
    console.log("login");

    this.router.navigate(['login']);
  }

  register() {
    console.log("register");

  }
  getErrorMessageFirstName() {
    return this.firstName.hasError('required') ? 'First name is a required field' :
      '';
  }

  getErrorMessageLastName() {
    return this.lastName.hasError('required') ? 'Last name is a required field' :
      '';
  }

  getErrorMessageUsername() {
    return this.username.hasError('required') ? 'Username is a required field' :
      '';
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'Email is a required field' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'Password is a required field' :
      '';
  }

}
