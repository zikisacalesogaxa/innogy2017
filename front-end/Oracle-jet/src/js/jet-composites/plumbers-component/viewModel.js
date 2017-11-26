/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'jquery'], function (oj, ko, $) {
    'use strict';

    function _Plumber(id, firstname, lastname, email, cellnumber) {
        this.cellnumber = "+27" + cellnumber;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.id = id;
        this.fullName = firstname + " " + lastname;
    }

    function _plumberSchedule(day, slot, employerName, employerNumber) {
        this.employerNumber = "+27" + employerNumber;
        this.employerName = employerName;
        this.slot = slot;
        this.day = day;
    }
    
    function ExampleComponentModel(context) {
        var self = this;
        self.composite = context.element;
        //Example observable
        self.messageText = ko.observable('plumber component');
        self.plumberSchedules = ko.observable([]);
        self.plumbers = ko.observable([]);
        self.plumber = ko.observable([]);
        let _plumberId = null;
        
        $.getJSON('http://localhost:8001/api/v1/plumbers', (data) => {
            let plumbers = data.plumbers;
            let plumbersholder = [];
            console.log(plumbers);
            for (let plumber of plumbers) {
                plumbersholder.push(new _Plumber(plumber.ID, plumber.First_Name, plumber.Last_Name, plumber.Email, plumber.CellNumber));
            }
            self.plumbers(plumbersholder);
        });

        self.getSchedule = (evt) => {
            _plumberId = evt.id;
            $.getJSON('http://localhost:8001/api/v1/plumbers/' + _plumberId, (data) => {
                let plumber = data.Plumber;
                let holder = [];
                self.plumber(new _Plumber(plumber.ID, plumber.First_Name, plumber.Last_Name, plumber.Email, plumber.CellNumber));
                for(let data of plumber.Schedules) {
                    holder.push(new _plumberSchedule(data.Day, data.Slot, data.Employer_Name, data.Employer_Number));
                }
                self.plumberSchedules(holder);
            });
        }

        self.hirePlumber = () => {
            let data = {
                employerName: $('.employerName').val(),
                employerNumber: $('.employerNumber').val(),
                slot: $('.slot').val(),
                day: $('.day').val()
            }
            $.ajax('http://localhost:8001/api/v1/plumbers/hire/' + _plumberId, {
                data: JSON.stringify(data),
                type: "post", contentType: "application/json",
                success: function (result) {
                    console.log(result);
                    alert("Plumber hired");
                    location.reload();
                }
            });
        }

        // context.props.then(function (propertyMap) {
        //     //Store a reference to the properties for any later use
        //     self.properties = propertyMap;

        //     //Parse your component properties here 

        // });
    };
    
    //Lifecycle methods - uncomment and implement if necessary 
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    //ExampleComponentModel.prototype.attached = function(context){
    //};

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.detached = function(context){
    //};

    return ExampleComponentModel;
});