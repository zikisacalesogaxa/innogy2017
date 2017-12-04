import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlumberScheduleService {

    private PlumbersUrl = 'http://localhost:9000/api/v2/plumbers';
    plumberScheduleObjArr: any;

    constructor(private http: Http) { }

    getSchedules(id: number) {
        this.plumberScheduleObjArr = [];
        return this.http.get(this.PlumbersUrl)
            .toPromise()
            .then(response => {
                response.json().forEach(plumber => {
                    if (plumber._id === Number(id)) {
                        this.plumberScheduleObjArr.push(plumber.Schedules);
                    }
                });
                return this.plumberScheduleObjArr;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
