import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { MailService } from '../mail/mail.service';
import { MessageService } from '../message/message.service';
import { ShowModalService } from '../show-modal/show-modal.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  result?: string;
  messages: string[] = [];

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private mailService: MailService,
    private showModalService:ShowModalService
  ) { }

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
    this.messages = [];
    this.authService.getAccessToken(this.authForm.value).subscribe({
        next: res => {
        if (res && res.access_token) {
          this.showModalService.hideModal();
          this.messageService.successMsg.next('Authenticated!');
            this.authForm.reset();
          } else {
            this.result = 'Please make sure the user name and password are valid!';
            console.log('Unkown error');
          }
        },
        error: err => {
          if (HttpStatusCode.Unauthorized === err.statusCode) {
            this.result = 'Please make sure the user name and password are valid!';
          }
          console.log('error:', err)
        }
      })
  }
}
