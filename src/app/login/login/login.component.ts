import { Component } from '@angular/core';
import { AuthenticationService, AlertService } from '../../services/index';
import { Router } from '@angular/router';


@Component({
    templateUrl : 'login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent{
    model: any = {};
    message: string;
    
    constructor(
        private authenticationService: AuthenticationService,
        private router : Router,
        private alertService : AlertService
    ){}

    login(){
        
        this.authenticationService.login(this.model.username, this.model.password).subscribe(
            result => {
                if(result === true){
                    this.router.navigate(['/dashboard']);
                }
                else{
                    this.router.navigate(['/login']);
                    this.alertService.error("Error: Username or password is incorrect.");
                }
        
        });
    };

}