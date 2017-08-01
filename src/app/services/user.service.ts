import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AuthenticationService } from './authentication.service';
 
import { User } from '../model/user';
import { Manager } from '../model/manager';

import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class UserService {
    currentUser: User;
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http,private authenticationService: AuthenticationService, private manager: Manager) { 
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
 
    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }
 
    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }
    
    getUserInfo()
    {
        return this.http
        .post('http://localhost:81/v1/rest/Person/GetUserInfo', null, this.jwtUser())
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    create(user: User): Promise<any> {
        return this.http
        .post('http://localhost:81/v1/rest/Manager/CreateUserMultifacturas', JSON.stringify(user), this.jwt())
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }
 
    update(user: User) {
        return this.http.put('/api/users/' + user.PersonId, user, this.jwt()).map((response: Response) => response.json());
    }
 
    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }
 
    // private helper methods
 
    private jwt() {
        if(!this.manager.AccessToken || !this.manager.Expiration || this.manager.Expiration < this.dateToYMD())
        {
                this.authenticationService
                    .getAccessTokenManager()
                    .then(data => {
                        this.manager.AccessToken = data.AccessToken;
                        this.manager.Expiration = data.Expiration;
                    }); 
        }

        let headers = new Headers({ 'Authorization': this.manager.AccessToken, 'Content-Type': 'application/x-www-form-urlencoded'});
        return new RequestOptions({ headers: headers });
    }

    //Token de usuario logueado
    private jwtUser() {
        if(!this.currentUser.AccessToken || !this.currentUser.Expiration || this.currentUser.Expiration < this.dateToYMD())
        {
            // not logged in so redirect to login page with the return url
            //this.router.navigate(['/login'], { queryParams: { returnUrl: this.state.url }});
        }

        let headers = new Headers({ 'Authorization': this.currentUser.AccessToken, 'Content-Type': 'application/json'});
        return new RequestOptions({ headers: headers });

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

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}