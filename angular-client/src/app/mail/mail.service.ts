import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap, of, catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MessageService } from '../message/message.service';
import { Mail } from './mail.model';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  mail = new Subject<string>();
  //errorMsg = new Subject<string | undefined>();
  //successMsg = new Subject<string | undefined>();

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  previewMail(body: Mail) {
    this.http.post('/api/mail/preview', body, {
      responseType: 'text'
    }).pipe(
      catchError(this.handleError<any>())
    ).subscribe({
      next: res => this.mail.next(res),
      error: (err) => {
        console.log('err:', err);
        this.messageService.errorMsg.next(err.messages);
      }
    })
  }

  sendMail(body: Mail, token?:string) {
    return this.http.post<string>('/api/mail', body, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }),
    }).pipe(
      catchError(this.handleError<any>())
    )
  }

  private handleError<T>() {
    return (error: any): Observable<T> => {
      return throwError(error.error as T)
    }
  }
}
