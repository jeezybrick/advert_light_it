import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';


@Injectable()
export class NoAuthGuard implements CanActivate {

  constructor(public auth: AuthService) {}

  canActivate() {
    return !this.auth.hasToken();
  }

}
