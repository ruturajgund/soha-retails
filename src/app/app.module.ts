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
  PaginationService, ReturnsService, SearchService, VendorService
} from './services/index';
import { OrdersComponent } from './orders/orders.component';
import { ReturnsComponent } from './returns/returns.component';
import { VendorRegistrationComponent } from './vendor-registration/vendor-registration.component';
import { SignupComponent } from './signup/signup.component';
import { VendorsComponent } from './vendors/vendors.component';
import { ViewVendorComponent } from './view-vendor/view-vendor.component';

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
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'vendorRegistration',
        pathMatch: 'full'
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'returns',
        component: ReturnsComponent
      },
      {
        path: 'vendorRegistration',
        component: VendorRegistrationComponent
      },
      {
        path: 'vendors',
        component: VendorsComponent
      },
      {
        path: 'viewVendor',
        component: ViewVendorComponent
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
    OrdersComponent,
    ReturnsComponent,
    VendorRegistrationComponent,
    SignupComponent,
    VendorsComponent,
    ViewVendorComponent
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
    PaginationService,
    ReturnsService,
    SearchService,
    VendorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
