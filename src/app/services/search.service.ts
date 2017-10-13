import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class SearchService {

    constructor(
        private http: Http
    ) { }

    search(searchParams){
        return this.http.post('/api/searchBy', searchParams).map((response: Response) => {
            return response;
        });
    }
}