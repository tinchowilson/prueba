import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';

@Component({
    selector: 'menu-header',
    templateUrl: '../views/header.component.html'
})

export class HeaderComponent implements OnInit {
    currentUser: User;
    userName: string;
    cuit: string;
    constructor(
        private user: User,
        private userService: UserService,
        private alertService: AlertService) { 
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    
    ngOnInit() { 
        this.getUserInfo();
    }

    private getUserInfo() {
        let rowData:any[] = [];
        this.userService.getUserInfo()
            .then(
                data => {
                    if (data.Person) {
                        this.currentUser.Denominacion = data.Person.User.Denominacion;
                        this.currentUser.Cuit = data.Person.User.Cuit;
                        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                    }
                    else{
                        this.alertService.error(data.OperationMessage.Text);
                    }
                },
                error => {
                    this.alertService.error(error);
                });
    }
}