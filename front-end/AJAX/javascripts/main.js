const apiUrl = "http://localhost:9000/api/v2/plumbers/";


// plumber class
function _Plumber(id, firstName, lastName, email, cellNumber, schedules) {
    this.cellNumber = cellNumber;
    this.schedules = schedules;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.id = id;
}

function _PlumberSchedule(day, slot, jobDescription, employerNumber, employerName) {
    this.jobDescription = jobDescription;
    this.employerNumber = employerNumber;
    this.employerName = employerName;
    this.slot = slot;
    this.day = day;
}

function AppViewModel() {
    const self = this;
    self.plumbers = ko.observable([]);
    self.selectedPlumberSchedules = ko.observable([]);

    $.getJSON(apiUrl, (plumbers) => {
        let plumbersArr = [];
        plumbers.forEach((plumber) => {
            plumbersArr.push(new _Plumber(plumber._id, plumber.firstName, plumber.lastName, plumber.email, plumber.cellNumber, plumber.schedules));
        }, self);
        return self.plumbers(plumbersArr);
    });

    self.viewSchedules = (evt) => {
        let plumberSchedules = [];
        let plumberId = evt.id;
        $.getJSON(apiUrl + plumberId, (plumber) => {
            console.log(plumber);
            let schedules = plumber.schedules;
            schedules.forEach( (data) => {
                plumberSchedules.push(new _PlumberSchedule(data.day, data.slot, data.jobDescription, data.employerNumber, data.employer));
            }, self);
            return self.selectedPlumberSchedules(plumberSchedules);
        });
    }
}

ko.applyBindings(new AppViewModel());
