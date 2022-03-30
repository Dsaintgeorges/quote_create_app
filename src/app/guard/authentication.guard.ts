import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  // implement canActivate method to check if user is authenticated or not
  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(): boolean {
    if (!this.userService.getToken()) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }

}
