"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const schedules_entity_1 = require("./src/entities/schedules.entity");
const plumbers_entity_1 = require("./src/entities/plumbers.entity");
const typeorm_1 = require("typeorm");
const connection_1 = require("./config/connection");
const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();
// use express middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());
// cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
// connection to DB
typeorm_1.createConnection(connection_1.default)
    .then((connection) => __awaiter(this, void 0, void 0, function* () {
    yield console.log('MySQL Connection has been established!');
}))
    .catch(error => {
    console.log('Error : ', error);
});
// routes
app.get('/', (req, res, next) => {
    let code = res.statusCode;
    res.json({
        code,
        routes: {
            getPlumbers: '/api/v1/plumbers',
            createPlumbers: '/api/v1/plumber',
            getPlumberById: '/api/v1/plumbers/:_id',
            getPlumbersByDay: '/api/v1/plumbers/schedules/:_day',
            hirePlumber: '/api/v1/plumbers/hire/:_id',
            deletePlumber: '/api/v1/plumbers/delete/:_id'
        }
    });
    next();
});
// Get all plumbers
app.get('/api/v1/plumbers', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let code = res.statusCode;
    let plumbers = yield typeorm_1.getRepository(plumbers_entity_1._plumberEntity).find({ relations: ["Schedules"] });
    res.json({
        code,
        plumbers
    });
    next();
}));
// Create new plumber
app.post('/api/v1/plumbers', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let data = req.body;
    let code = res.statusCode;
    let plumber = yield typeorm_1.getRepository(plumbers_entity_1._plumberEntity).findOne({ Username: data.userName });
    if (!plumber) {
        let _plumber = new plumbers_entity_1._plumberEntity();
        _plumber.Email = data.email;
        _plumber.Username = data.userName;
        _plumber.Last_Name = data.lastName;
        _plumber.First_Name = data.firstName;
        _plumber.CellNumber = data.cellNumber;
        yield typeorm_1.getRepository(plumbers_entity_1._plumberEntity)
            .manager
            .save(_plumber)
            .then((plumber) => {
            res.json({
                code,
                plumber
            });
        })
            .catch((err) => {
            res.json({
                code,
                err
            });
        });
    }
    else {
        res.json({
            code,
            msg: 'Username already taken'
        });
        next();
    }
}));
// Get plumber by Id
app.get('/api/v1/plumbers/:_id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let code = res.statusCode;
    let _plumberId = req.params._id;
    let Plumber = yield typeorm_1.getRepository(plumbers_entity_1._plumberEntity).findOneById(_plumberId, { relations: ["Schedules"] });
    (!Plumber) ? res.json({ code, msg: 'Plumber not found!' }) : res.json({ code, Plumber });
    next();
}));
// Get plumber by day
app.get('/api/v1/plumbers/schedules/:_day', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let code = res.statusCode;
    let _day = req.params._day;
    let plumbers = yield typeorm_1.getRepository(schedules_entity_1._scheduleEntity).find({ Day: _day.toLowerCase() });
    res.json({
        code,
        plumbers
    });
    next();
}));
// Hire plumber
app.post('/api/v1/plumbers/hire/:_id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let data = req.body;
    let code = res.statusCode;
    let _plumberId = req.params._id;
    let plumber = yield typeorm_1.getRepository(plumbers_entity_1._plumberEntity).findOneById(_plumberId);
    if (plumber) {
        let _schedule = new schedules_entity_1._scheduleEntity();
        _schedule.Employer_Number = data.employerNumber;
        _schedule.Job_Description = data.jobDescription;
        _schedule.Employer_Name = data.employerName;
        _schedule.Slot = data.slot;
        _schedule.Day = data.day;
        _schedule.Plumber = plumber;
        typeorm_1.getRepository(schedules_entity_1._scheduleEntity)
            .manager
            .save(_schedule)
            .then((plumber) => {
            res.json({
                code,
                plumber
            });
        })
            .catch((err) => {
            res.json({
                code,
                err
            });
            next();
        });
    }
}));
// Delete plumber
app.delete('/api/v1/plumbers/delete/:_id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let code = res.statusCode;
    let _plumberId = req.params._id;
    yield typeorm_1.getRepository(plumbers_entity_1._plumberEntity).removeById(_plumberId)
        .then((plumber) => {
        res.json({
            code,
            msg: 'plumber deleted'
        });
    })
        .catch((err) => {
        res.json({
            code,
            err
        });
        next();
    });
}));
// initialize port
const port = process.env.PORT || 8080;
app.listen(port, (error) => __awaiter(this, void 0, void 0, function* () {
    (error) ? yield console.error(error) : yield console.log('App running on http://localhost:' + port);
}));
