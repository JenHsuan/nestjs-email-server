import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap, throwError } from 'rxjs';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  accessToken = new Subject<string | undefined>();
  constructor(private http: HttpClient) { }

  getAccessToken(user: User): Observable<any> {
    return this.http.post<any>('/api/auth/login', user).pipe(
      tap(data => this.accessToken.next(data.access_token)),
      catchError(this.handleError<any>())
    );
  }

  private handleError<T>() {
    return (error: any): Observable<T> => {
      return throwError(error.error as T)
    }
  }
}
