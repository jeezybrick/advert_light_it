import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';

import { UserService } from '../user/user.service';
import { AuthUser } from '../../models/created-user.model';
import { User } from '../../models/user.model';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  public cachedRequests: Array<HttpRequest<any>> = [];
  public currentUser: AuthUser;

  constructor(private userService: UserService,
              private http: HttpClient) {
    this.currentUser = JSON.parse(this.getToken());
  }

  public register(user: User): Observable<any> {

    return this.userService.create(user)
      .pipe(
        map((userData: AuthUser) => {
          return this.setUserDataToLocalStorage(userData);
        })
      );

  }

  public login(user): Observable<any> {

    return this.http.post<any>(`${environment.light_it_api_url}/login/`, user)
      .pipe(
        map((parameters: { userData: AuthUser }) => {
          return this.setUserDataToLocalStorage(parameters);
        })
      );
  }

  private setUserDataToLocalStorage(userData): AuthUser {

    console.log(userData);

    if (userData && userData.token) {

      console.log(userData);

      this.currentUser = userData;
      localStorage.setItem('currentUser', JSON.stringify(userData));
      this.isLoginSubject.next(true);
    }

    return userData;
  }


  public logout(): void {
    localStorage.removeItem('currentUser');
    this.isLoginSubject.next(false);
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  public hasToken(): boolean {
    return !!this.getToken();
  }

  public getToken(): string {
    return localStorage.getItem('currentUser');
  }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }
}
