import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, mergeMap, of, tap } from 'rxjs';
import { SessionService } from 'src/app/core/services/session.service';
import {
  LoginSuccessful,
  SingleUserResponse,
} from 'src/app/models/reqres.interfaces';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/store/app.reducer';
import { setAuthenticatedUser, unsetAuthenticatedUser } from 'src/app/store/auth/auth.actions';
import { selectAuthenticatedUser } from 'src/app/store/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://reqres.in/api';
  authenticatedUser: Observable<User| null>;

  constructor(
    private readonly httpClient: HttpClient,
    // private readonly sessionService: SessionService,
    private readonly store: Store<AppState>,
    private readonly router: Router,
  ) {
    this.authenticatedUser = this.store.select(selectAuthenticatedUser);
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.httpClient
      .post<LoginSuccessful>(`${this.apiUrl}/login`, data)
      .pipe(
        tap((data) => localStorage.setItem('token', data.token)),
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
        // tap((user) => this.sessionService.setUser(user))
        tap((user) => this.store.dispatch(setAuthenticatedUser({ authenticatedUser: user })))
      );
  }

  logOut() {
    localStorage.removeItem('token');
    this.store.dispatch(unsetAuthenticatedUser());
    this.router.navigate(['auth', 'login']);
  }

  verifyToken(): Observable<boolean> {
    const lsToken = localStorage.getItem('token');

    return of(lsToken)
      .pipe(
        tap((token) => {
          if (!token) throw new Error('Token invalido')
        }),
        mergeMap((token) => 
          this.httpClient.get<SingleUserResponse>(`${this.apiUrl}/users/7`)
        ),
        tap(({ data }) => {
          this.store.dispatch(setAuthenticatedUser({
              authenticatedUser: new User(
                data.id,
                data.email,
                data.first_name,
                data.last_name,
                data.avatar
              )
            })
          )
        }),
        map((user) => !!user),
        catchError(() => of(false))
      )
  }
}
