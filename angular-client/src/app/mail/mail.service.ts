import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap, of, catchError } from 'rxjs';
import { Mail } from './mail.model';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  mail = new Subject<string>();
  errorMsg = new Subject<string>();

  constructor(private http: HttpClient) { }

  previewMail(body: Mail) {
    this.http.post<string>('/api/mail/preview', body).pipe(
      catchError((err:HttpErrorResponse) => of(err.error))
    ).subscribe({
      next: res => this.mail.next(res.text),
      error: (err:HttpErrorResponse) => {
        console.log('err:', err);
        this.errorMsg.next(err.error)
      }
    })
  }
}
