import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MailService } from '../mail/mail.service';
import { Mail } from './mail.model';
import { Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {
  mailSubject = new Subject<Mail>();
  errorMsg?:string;

  constructor(private mailService:MailService) { }

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
        ).subscribe((data:Mail) => {
            this.mailService.previewMail(data)
        })

        this.mailService.errorMsg.subscribe(errorMsg => this.errorMsg = errorMsg);
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
