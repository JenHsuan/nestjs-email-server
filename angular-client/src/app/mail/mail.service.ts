import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap, of, catchError, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Mail } from './mail.model';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  mail = new Subject<string>();
  errorMsg = new Subject<string>();
  successMsg = new Subject<string>();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

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

  sendMail(body: Mail, token?:string) {
    this.http.post<string>('/api/mail', body, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }),
    }).pipe(
      catchError(this.handleError<any>())
    ).subscribe({
      next: res => {
        if (res && HttpStatusCode.Unauthorized === res.statusCode) {
          this.errorMsg.next('Expired, please authenticate again!');
          this.authService.accessToken.next(undefined)
        } else {
          const date = new Date();
          this.successMsg.next(`Mail has been sent, last mail: ${date.getHours()}:${date.getMinutes()} ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`)
        }
      },
      error: (err:HttpErrorResponse) => {
        console.log('err:', err);
        this.errorMsg.next(err.error)
        this.authService.accessToken.next(undefined)
      }
    })
  }

  private handleError<T>() {
    return (error: any): Observable<T> => {
      return of(error.error as T)
    }
  }
}
