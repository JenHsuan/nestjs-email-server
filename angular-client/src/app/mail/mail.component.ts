import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MailService } from '../mail/mail.service';
import { Mail } from './mail.model';
import { Observable, of, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { ShowModalService } from '../show-modal/show-modal.service';
import { AuthService } from '../auth/auth.service';
import { HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {
  mailSubject = new Subject<Mail>();
  //errorMsg?: string;
  //successMsg?: string;
  showSendBtn = false;
  token?: string;

  constructor(
    private mailService: MailService,
    private showModalService: ShowModalService,
    private authService: AuthService,
    private messageService: MessageService
    //private router: Router
  ) { }

  get isFormValid() {
    return this.mailForm.get('recipient')?.valid &&
           this.mailForm.get('subject')?.valid &&
           this.mailForm.get('title')?.valid &&
           this.mailForm.get('logo')?.valid &&
           this.mailForm.get('link')?.valid &&
           this.mailForm.get('btnText')?.valid &&
           this.mailForm.get('text')?.valid &&
           this.mailForm.get('footer')?.valid;
  }

  onPreview(){
    this.mailService.previewMail(this.mailForm.value)
  }

  sendMail() {
    this.mailService.sendMail(this.mailForm.value, this.token).subscribe({
      next: res => {
        const date = new Date();
        this.messageService.successMsg.next(`Mail has been sent, last mail: ${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()} ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`);
      },
      error: err => {
        console.log('err:', err);
        let errMsg = err.error;
        this.authService.accessToken.next(undefined)
        if (err && HttpStatusCode.Unauthorized === err.statusCode) {
          errMsg = 'Expired, please authenticate again!';
        }
        this.messageService.errorMsg.next(errMsg);
      }
    });
  }

  private initForm(){
    this.mailForm.patchValue({
        recipient: 'of_alpha@hotmail.com;ofalpha@gmail.com',
        subject: 'Daily Learning Newpaper',
        title: 'Daily Learning Newpaper',
        text: `There are several things we need to set for building a new Next.js project. There is a new way that we only have to do it once
        For example, we have to re-create files and settings for Redux, Redux middleware, Styled-components again and again if we need them. Sometimes, we may also need extra things like setting Jest, Enor using TypeScript.`,
        logo: 'https://raw.githubusercontent.com/JenHsuan/ALayman/master/views/images/alaymanicon.png',
        btnText: 'Daily-Learing website',
        link: 'https://daily-learning.herokuapp.com/',
        footer: JSON.stringify({
            blog: 'https://medium.com/a-layman',
            facebook: 'https://www.facebook.com/imalayman'
        })
    })
  }

  ngOnInit(): void {
    this.initForm();
    this.onPreview();
    this.mailSubject.pipe(
       debounceTime(300),
       // ignore new term if same as previous term
       distinctUntilChanged(),
       switchMap((data:Mail): Observable<void> => {
        return of(this.mailService.previewMail(data))
       })
    ).subscribe()

    this.authService.accessToken.subscribe(token => {
      this.token = token;
      this.showSendBtn = token ? true : false;
    })
    // this.mailService.successMsg.subscribe(successMsg => this.successMsg = successMsg);
    // this.mailService.errorMsg.subscribe(errorMsg => this.errorMsg = errorMsg);
  }

  onAuth() {
    this.showModalService.showModal();
  }

  onFormChanged() {
    this.mailSubject.next(this.mailForm.value)
  }

  mailForm = new FormGroup({
    'recipient': new FormControl(null, [
      Validators.required
    ]),
    'subject': new FormControl(null, [
      Validators.required
    ]),
    'title': new FormControl(null, [
      Validators.required
    ]),
    'text': new FormControl(null, [
      Validators.required
    ]),
    'logo': new FormControl(null, [
      Validators.required
    ]),
    'btnText': new FormControl(null, [
      Validators.required
    ]),
    'link': new FormControl(null, [
      Validators.required
    ]),
    'footer': new FormControl(null, [
      Validators.required
    ])
  })
}
