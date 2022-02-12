import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap, of, catchError, Observable } from 'rxjs';
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
      catchError(this.handleError<any>())
    ).subscribe({
      next: res => this.mail.next(res.text),
      error: (err:HttpErrorResponse) => {
        console.log('err:', err);
        this.errorMsg.next(err.error)
      }
    })
  }

  private handleError<T>() {
    return (error: any): Observable<T> => {
      return of(error.error as T)
    }
  }
}
