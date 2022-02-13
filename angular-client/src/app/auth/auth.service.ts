import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
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
      catchError((err:HttpErrorResponse) => of(err.error))
    );
  }
}
