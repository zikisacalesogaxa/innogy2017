import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlumbersService {

    private PlumbersUrl = 'http://localhost:9000/api/v2/plumbers';
    plumbersArray: any;

    constructor(private http: Http) { }

    getPlumbers() {
        this.plumbersArray = [];
        return this.http.get(this.PlumbersUrl)
            .toPromise()
            .then(response => {
                // let plumbers = response;
                response.json().forEach(element => {
                    console.log(element);
                });

            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
