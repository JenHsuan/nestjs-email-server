import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  result?: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  authForm = new FormGroup({
    'username': new FormControl(null, [
      Validators.required
    ]),
    'password': new FormControl(null, [
      Validators.required
    ])
  })

  onSubmit() {
    this.authService.getAccessToken(this.authForm.value)
      .subscribe({
        next: res => {
          if (HttpStatusCode.Unauthorized === res.statusCode) {
            this.result = 'Please make sure the user name and password are correct!'
          } else if (res.access_token) {
            this.result = res;
          }
          console.log('res:', res)
        },
        error: res => {
          if (HttpStatusCode.Unauthorized === res.statusCode) {
            this.result = 'Please make sure the user name and password are correct!'
          }
          console.log('error:', res)
        }
      })
    console.log(this.authForm.value)
  }
}
