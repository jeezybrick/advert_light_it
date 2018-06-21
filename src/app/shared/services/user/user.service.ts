import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';


const base_url = 'http://light-it-04.tk/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  create(user: User): Observable<any> {
    return this.http.post<any>(`${base_url}/registration/`, user);
  }
}
