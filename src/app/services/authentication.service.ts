import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router'

@Injectable()
export class AuthenticationService {
    
    public token: string;

    constructor(
        private http: Http,
        private router: Router
    ) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
     }

    
    login(username: string, password: string) {
        return this.http.post('/api/authenticate', { username: username, password: password })
            .map((response: Response) => {
                let token = response.json() && response.json().token;
                var data = response.json();
                // var user = data.currentUser;
                if (token) {
                    // set token property
                    this.token = token;
 
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, name: data.currentUser.name,  role: data.currentUser.role,mobile: data.currentUser.mobile, email: data.currentUser.email, token: token }));
                    console.log(localStorage);
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout() {
        this.token = null;
        localStorage.removeItem('currentUser');
        console.log(localStorage);
        this.router.navigate(['/login']);
    }

    signup(user){
        return this.http.post('/api/signup', user)
        .map((response: Response) => {
            return response;
        });
    }
}