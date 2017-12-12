import { Component, OnInit } from '@angular/core';
import { Vendor, Document } from '../models/index';
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
  vendorDocuments: Document[] = [];
  newDocument = new Document();
  currencies = [
    {
      currency: 'USD',
    },
    {
      currency: 'GBP',
    },
    {
      currency: 'INR',
    },
    {
      currency: 'YUAN',
    }

  ];
  agreed :boolean = false;



  constructor(
    private vendorService: VendorService
  ) {
  }

  ngOnInit() {
  }

  doExport(doExportFlag) {
    this.vendor.doExport = doExportFlag;
  }

  haveExportLicense(haveExportLicenseFlag) {
    this.vendor.haveExportLicense = haveExportLicenseFlag;
  }

  doShipGoodToOverseas(doShipGoodToOverseasFlag) {
    this.vendor.doShipGoodToOverseas = doShipGoodToOverseasFlag;
  }

  legalStructure(legalStructureFlag) {
    this.vendor.legalStructure = legalStructureFlag;
  }

  internationalBussiness(internationalBussinessFlag) {
    this.vendor.internationalBussiness = internationalBussinessFlag;
  }

  onChange(event) {
    var files = event.srcElement.files;
    this.readThis(event.target);
    this.newDocument.documentName = files[0].name;
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = function (e) {
      // you can perform an action with readed data here
      // console.log(myReader.result);
    }

    myReader.readAsText(file);
  }

  addNewDocument() {
    this.vendorDocuments.push(this.newDocument);
    console.log(this.vendorDocuments);

    this.newDocument = new Document();
  }

  removeDocument(index) {
    this.vendorDocuments.splice(index, 1);
  }

  submit() {
    this.spinnerFlag = true;
    console.log(this.vendorDocuments);

    this.vendorService.saveVendorDetails(this.vendor).subscribe(
      response => {
        var data = response.json();
        if (data.status === 200) {
          this.spinnerFlag = false;
          this.formVisibilityFlag = false;
        }
      }
    );
  }
}
