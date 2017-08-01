import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { Manager } from '../model/manager';
import { AuthenticationService } from '../services/authentication.service';


@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: '../views/register.component.html',
    styleUrls: ['../css/register.component.css']
})

export class RegisterComponent implements OnInit{
    model: any = {};

    title = 'Registro';
    loading = false;
    ngOnInit(): void {
        this.getAuthenticationManager();
    }

    constructor(
        private userService: UserService,
        private router: Router,
        private alertService: AlertService,
        private manager: Manager,
        private authenticationService: AuthenticationService
        ) { }

    getAuthenticationManager(): void {
            this.authenticationService.getAccessTokenManager()
            .then(data => {
                            this.manager.AccessToken = data.AccessToken;
                            this.manager.Expiration = data.Expiration;
                        }); 
    }

    register(): void {
        this.loading = true;
        this.userService.create(this.model)
        .then(data => {
                        if(data.OperationStatus == "Ok")
                        {
                            this.alertService.success('Registrado correctamente', true);
                            this.router.navigate(['/login']);
                        }
                        else
                        {
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