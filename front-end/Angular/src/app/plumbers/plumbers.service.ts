import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlumbersService {

    private PlumbersUrl = 'http://localhost:9000/api/v2/plumbers';
    plumberScheduleObjArr: any;
    plumbersArray: any;

    constructor(private http: Http) { }

    getPlumbers() {
        this.plumbersArray = [];
        return this.http.get(this.PlumbersUrl)
            .toPromise()
            .then(response => {
                response.json().forEach(element => {
                    const plumbersObj = {};

                    plumbersObj['Contact_Details'] = element.cellNumber;
                    plumbersObj['First_Name'] = element.firstName;
                    plumbersObj['Last_Name'] = element.lastName;
                    plumbersObj['Email'] = element.email;
                    plumbersObj['_Id'] = element._id;

                    if (!this.plumbersArray.find(plumber => {
                        return plumber._Id === element._Id;
                    })) {
                        this.plumbersArray.push(plumbersObj);
                    }
                });
                return this.plumbersArray;
            })
            .catch(this.handleError);
    }

    getSchedules(id: number) {
        this.plumberScheduleObjArr = [];
        return this.http.get(this.PlumbersUrl)
            .toPromise()
            .then(response => {
                response.json().forEach(plumber => {
                    if (plumber._id === id) {
                        this.plumberScheduleObjArr = plumber.schedules;
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
