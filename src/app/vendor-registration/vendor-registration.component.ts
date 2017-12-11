import { Component, OnInit } from '@angular/core';
import { Vendor } from '../models/index';
import { VendorService } from '../services/index'

@Component({
  selector: 'app-vendor-registration',
  templateUrl: './vendor-registration.component.html',
  styleUrls: ['./vendor-registration.component.css']
})
export class VendorRegistrationComponent implements OnInit {

  vendor = new Vendor();
  spinnerFlag: boolean = false;
  formVisibilityFlag = true;

  constructor(
    private vendorService: VendorService
  ) { 
  }

  ngOnInit() {
  }
  
  doExport(doExportFlag){
    this.vendor.doExport = doExportFlag;
  }

  haveExportLicense(haveExportLicenseFlag){
    this.vendor.haveExportLicense = haveExportLicenseFlag;
  }

  doShipGoodToOverseas(doShipGoodToOverseasFlag){
    this.vendor.doShipGoodToOverseas = doShipGoodToOverseasFlag;
  }

  legalStructure(legalStructureFlag){
    this.vendor.legalStructure = legalStructureFlag;
  }

  internationalBussiness(internationalBussinessFlag){
    this.vendor.internationalBussiness = internationalBussinessFlag;
  }

  submit(){
    this.spinnerFlag = true;
    this.vendorService.saveVendorDetails(this.vendor).subscribe(
      response => {
          var data = response.json();
          if(data.status === 200){
            this.spinnerFlag = false;
            this.formVisibilityFlag = false;
          }
      }
  );
  }
}
