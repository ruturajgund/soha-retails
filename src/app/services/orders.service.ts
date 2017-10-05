import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class OrdersServices {

    constructor(
        private http: Http
    ) { }

    getAllOrders() {
        return this.http.get('/api/getAllOrders').map((response: Response) => {
            console.log(response);
            
            return response;
        });
    }
}