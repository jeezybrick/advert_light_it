import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  public cachedRequests: Array<HttpRequest<any>> = [];

  public login() {
    localStorage.setItem('token', 'JWT');
    this.isLoginSubject.next(true);
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.isLoginSubject.next(false);
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  public hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }
}
