import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/index';
import { AuthenticationService, AlertService } from '../services/index';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  model = new User();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.model.role = 'USER';
  }

  signup() {
    this.authenticationService.signup(this.model).subscribe(
      response => {
        var data = response.json();
        if (data.status === 500) {
          this.alertService.error(data.message, true);
        }
        else {
          this.alertService.success(data.message, true);
          this.model = new User();
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
