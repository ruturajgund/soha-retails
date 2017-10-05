import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/index'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: any = {};
  brandName : string = "Soha Retail Protal";

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
   }

  ngOnInit() {
  }

  logout(){
    this.authenticationService.logout();
}
}
