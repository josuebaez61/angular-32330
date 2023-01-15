import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, mergeMap, of, tap } from 'rxjs';
import { SessionService } from 'src/app/core/services/session.service';
import {
  LoginSuccessful,
  SingleUserResponse,
} from 'src/app/models/reqres.interfaces';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://reqres.in/api';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly sessionService: SessionService,
    private readonly router: Router,
  ) {}

  login(data: { email: string; password: string }): Observable<User> {
    return this.httpClient
      .post<LoginSuccessful>(`${this.apiUrl}/login`, data)
      .pipe(
        tap(({ token }) => localStorage.setItem('token', token)),
        mergeMap(() =>
          this.httpClient.get<SingleUserResponse>(`${this.apiUrl}/users/7`)
        ),
        map(
          ({ data }) =>
            new User(
              data.id,
              data.email,
              data.first_name,
              data.last_name,
              data.avatar
            )
        ),
        tap((user) => this.sessionService.setUser(user))
      );
  }

  verifyToken(): Observable<boolean> {
    const lsToken = localStorage.getItem('token');
    return of(lsToken)
      .pipe(
        tap((token) => {
          if (!token) throw Error('Invalid token')
        }),
        mergeMap(() => this.httpClient.get<SingleUserResponse>(`${this.apiUrl}/users/7`)),
        map(
          ({ data }) =>
            new User(
              data.id,
              data.email,
              data.first_name,
              data.last_name,
              data.avatar
            )
        ),
        tap((user) => this.sessionService.setUser(user)),
        map((user) => !!user),
        catchError(() => of(false))
      )
  }

  logOut() {
    this.sessionService.setUser(null);
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login']);
  }
}
