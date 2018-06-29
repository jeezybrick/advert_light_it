import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthUser } from '../../shared/models/created-user.model';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.scss']
})
export class UserAreaComponent implements OnInit {

   public isLoggedIn: Observable<boolean>;
   public currentUser: AuthUser;

  constructor(public authService: AuthService) {
    this.isLoggedIn = authService.isLoggedIn();
    this.currentUser = authService.currentUser;
  }

  ngOnInit() {
  }

  public logout() {
    this.authService.logout();
  }

  get userFullName() {

    if (!this.currentUser.user.first_name && !this.currentUser.user.last_name) {
      return 'No name user';
    }
    return `${ this.currentUser.user.first_name } ${ this.currentUser.user.last_name }`;
  }

}
