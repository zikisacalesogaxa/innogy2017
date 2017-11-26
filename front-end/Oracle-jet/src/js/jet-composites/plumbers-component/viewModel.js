/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'jquery'], function (oj, ko, $) {
    'use strict';

    function _Plumber(firstname, lastname, email) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }
    
    function ExampleComponentModel(context) {
        var self = this;
        self.composite = context.element;
        //Example observable
        self.messageText = ko.observable('plumber component');
        self.plumbers = ko.observable([]);

        $.getJSON('http://localhost:8080/api/v2/plumbers', (data) => {
            let plumbers = data.plumbers;
            for (let plumber of plumbers) {
                // console.log(plumber);
                self.plumbers().push(new _Plumber(plumber.firstName, plumber.lastName, plumber.email));
            }
            console.log(self.plumbers());
        })

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