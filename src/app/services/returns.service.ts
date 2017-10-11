import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class ReturnsService {

    constructor(
        private http: Http
    ) { }

    getAllReturns() {
        return this.http.get('/api/getAllReturns').map((response: Response) => {
            return response;
        });
    }
}