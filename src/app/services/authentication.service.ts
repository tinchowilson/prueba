import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Manager } from '../model/manager'; 
import { User } from '../model/user'; 
 
@Injectable()
export class AuthenticationService {
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http, private manager: Manager ) { }
 
    login(email: string, password: string): Promise<any> {
        debugger;
        return this.http
        .post('http://localhost:81/v1/rest/Person/GetAccessTokenPersona', 
        JSON.stringify({ email: email, password: password }),
         {headers: this.headers})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }
 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    getAccessTokenManager(): Promise<Manager> {
        debugger;
        const apiUrl = 'http://localhost:81/v1/rest/Manager/GetAccessTokenManager';
        this.manager.User = "manager@community4biz.com";
        this.manager.Password = "Factu2007";
        return this.http.post(apiUrl,
                this.manager, {headers: this.headers})
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }

     private handleError(error: any): Promise<any> {
            console.error('An error occurred', error); // for demo purposes only
            return Promise.reject(error.message || error);
        }
}