import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';

import { User } from '../model/user';
 
@Component({
    moduleId: module.id,
    templateUrl: '../views/login.component.html',
    styleUrls: ['../css/login.component.css']
})
 
export class LoginComponent implements OnInit {
    title = "Bienvenidos a C4B";
    model: any = {};
    loading = false;
    returnUrl: string;
    currentUser: User;
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private user: User) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
 
    login() {
        this.loading = true;
        this.user.Email = this.model.email;
        this.authenticationService.login(this.model.email, this.model.password)
            .then(
                data => {
                    if (data.Expiration && data.AccessToken) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        this.user.AccessToken = data.AccessToken;
                        this.user.Expiration = data.Expiration;
                        localStorage.setItem('currentUser', JSON.stringify(this.user));
                        this.router.navigate([this.returnUrl]);
                    }
                    else{
                        this.alertService.error(data.OperationMessage.Text);
                        this.loading = false;
                    }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }  
}