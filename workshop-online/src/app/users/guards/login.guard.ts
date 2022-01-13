import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService){}

  canActivate() {
    let identity = this.userService.getIdentity();
    if(identity){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
