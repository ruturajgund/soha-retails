import { Component, OnInit } from '@angular/core';
import { VendorService } from '../services/index';
import { Vendor } from '../models/index';
import { Router } from '@angular/router'

@Component({
  selector: 'app-view-vendor',
  templateUrl: './view-vendor.component.html',
  styleUrls: ['./view-vendor.component.css']
})
export class ViewVendorComponent implements OnInit {
  
  vendorId : string;
  vendor = new Vendor();

  constructor(
    private vendorService : VendorService,
    private router : Router
  ) {
    this.vendorId = localStorage.getItem('vendorId');
   }

  ngOnInit() {
    this.vendorService.getVendorDetails(this.vendorId).subscribe(
      response => {
        var data = response.json();
        if (data.status === 200) {
          this.vendor = data.vendor;
        }
      }
    );
  }

  back(){
    localStorage.removeItem('vendorId');
    this.router.navigate(['/dashboard/vendors']);
  }
}
