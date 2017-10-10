import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlertComponent } from './directives/alert/alert.component';
import {
  AlertService, AuthenticationService, OrdersServices,
  PaginationService
} from './services/index';
import { OrdersComponent } from './orders/orders.component';

const ROUTES = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full'
      },
      {
        path: 'orders',
        component: OrdersComponent
      }
    ]
  }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AlertComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    AlertService,
    AuthenticationService,
    OrdersServices,
    PaginationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
