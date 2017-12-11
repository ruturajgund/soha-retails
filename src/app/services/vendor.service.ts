import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class VendorService {

    constructor(
        private http: Http
    ) { }

    saveVendorDetails(vendor) {
        return this.http.post('/api/saveVendorDetails', vendor).map((response: Response) => {
            return response;
        });
    }
}