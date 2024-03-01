import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      const currentUser: User = JSON.parse(currentUserString);
      if (currentUser.isLoggedIn === true) {
        return true;
      }
    }
    this.router.navigate(['/home']);
    return false;
  }
}
