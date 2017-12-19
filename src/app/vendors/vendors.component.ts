import { Component, OnInit } from '@angular/core';
import { VendorService } from '../services/index';
import { Vendor } from '../models/index';
import { Router } from '@angular/router'

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  vendors: Vendor[] = [];
  spinnerFlag: boolean = false;

  constructor(
    private vendorService: VendorService,
    private router : Router
  ) { }

  ngOnInit() {
    this.spinnerFlag = true;
    this.vendorService.getAllVendors().subscribe(
      response => {
        var data = response.json();
        if (data.status === 200) {
          this.spinnerFlag = false;
          this.vendors = data.vendors;
        }
      }
    );
  }

  getVendorDetails(id){
    localStorage.setItem('vendorId', id);
    this.router.navigate(['/dashboard/viewVendor']);
  }

}
