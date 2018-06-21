import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth/auth.service';
import { AuthUser } from '../shared/models/created-user.model';

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

}
