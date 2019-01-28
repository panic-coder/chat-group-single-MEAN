import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private httpService: HttpService) { }
  hide = true;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  ngOnInit() {
  }

  login() {
    var loginData = {
      user_name: this.username.value,
      password: this.password.value
    }
    this.httpService.postRequest('login', loginData).subscribe(data => {
      console.log(data);
      this.router.navigate(['home']);
    }, err => {
      console.log(err);
      
    })

    // this.router.navigate(['home']);
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
