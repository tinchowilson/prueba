import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AuthenticationService } from './authentication.service';
 
import { User } from '../model/user';
import { Manager } from '../model/manager';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class InvoicesService {
    currentUser: User;
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
 
    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }
 
    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }
    
    getReceivedInvoiceList(filtro: any): Promise<any> {
        return this.http
        .post('http://localhost:81/v1/rest/Integration/GetReceivedInvoiceList', JSON.stringify(filtro), this.jwt())
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    getInvoiceTypeList(): Promise<any> {
        return this.http
        .post('http://localhost:81/v1/rest/Listado/GetTipoComprobanteList', this.jwt())
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    generatedPDF(model: any): Promise<any> {
        return this.http
        .post('http://localhost:81/v1/rest/Integration/GeneratedPDF', JSON.stringify(model), this.jwt())
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