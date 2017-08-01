import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../model/user';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router, private user: User) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        if (this.user && this.user.AccessToken &&this.user.Expiration > this.dateToYMD()) {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }

    dateToYMD() {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        var h = date.getHours();
        var min = date.getMinutes();
        return '' + y + '' + (m<=9 ? '0' + m : m) + '' + (d <= 9 ? '0' + d : d) + h + min;
    }
}