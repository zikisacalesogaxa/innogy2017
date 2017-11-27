import 'reflect-metadata';
import { _scheduleEntity } from './src/entities/schedules.entity';
import { _plumberEntity } from './src/entities/plumbers.entity';
import { createConnection, getRepository } from 'typeorm';
import { Request, Response, NextFunction} from 'express';
import connection from './config/connection';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as cors from 'cors';
const app = express();

// use express middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());

// cors
app.use( (req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// connection to DB
createConnection(connection)
    .then(async (connection) => {
        await console.log('MySQL Connection has been established!');
    })
    .catch(error => {
        console.log('Error : ', error);
    })

// routes
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    let code = res.statusCode;
    res.json({
        code,
        routes: {
            getPlumbers : '/api/v1/plumbers',
            createPlumbers : '/api/v1/plumber',
            getPlumberById : '/api/v1/plumber/:_id',
            getPlumbersByDay : '/api/v1/plumbers/schedules/:_day',
            hirePlumber : '/api/v1/plumbers/hire/:_id',
            deletePlumber : '/api/v1/plumbers/delete/:_id'
        }
    });
    next();
});

// Get all plumbers
app.get('/api/v1/plumbers', async (req: Request, res: Response, next: NextFunction) => {
    let code = res.statusCode;
    let plumbers = await getRepository(_plumberEntity).find({ relations: ["Schedules"]})

    res.json({
        code,
        plumbers
    });
    next();
});

// Create new plumber
app.post('/api/v1/plumbers', async (req: Request, res: Response, next: NextFunction) => {
    let data = req.body;
    let code = res.statusCode;

    let plumber = await getRepository(_plumberEntity).findOne({ Username: data.userName });

    if (!plumber) {
        let _plumber = new _plumberEntity();
        _plumber.Email = data.email;
        _plumber.Username = data.userName;
        _plumber.Last_Name = data.lastName;
        _plumber.First_Name = data.firstName;
        _plumber.CellNumber = data.cellNumber;

        await getRepository(_plumberEntity)
            .manager
            .save(_plumber)
            .then( (plumber) => {
                res.json({
                    code,
                    plumber
                })
            })
            .catch( (err) => {
                res.json({
                    code,
                    err
                })
            })
    } else {
        res.json({
            code,
            msg: 'Username already exist'
        });
        next();
    }
});

// Get plumber by Id
app.get('/api/v1/plumbers/:_id', async (req: Request, res: Response, next: NextFunction) => {
    let code = res.statusCode;
    let _plumberId = req.params._id;
    let Plumber = await getRepository(_plumberEntity).findOneById(_plumberId, { relations: ["Schedules"]});
    
    (!Plumber) ? res.json({ code, msg: 'Plumber not found!' }) : res.json({ code,  Plumber });
    next();
});

// Get plumber by day
app.get('/api/v1/plumbers/schedules/:_day', async (req: Request, res: Response, next: NextFunction) => {
    let code = res.statusCode;
    let _day = req.params._day;
    let plumbers = await getRepository(_scheduleEntity).find({ Day: _day.toLowerCase() });

    res.json({
        code,
        plumbers
    });
    next();
});

// Hire plumber
app.post('/api/v1/plumbers/hire/:_id', async (req: Request, res: Response, next: NextFunction) => {
    let data = req.body;
    let code = res.statusCode;
    let _plumberId = req.params._id;
    let plumber = await getRepository(_plumberEntity).findOneById(_plumberId);

    if (plumber) {
        let _schedule = new _scheduleEntity();
        _schedule.Employer_Number = data.employerNumber;
        _schedule.Job_Description = data.jobDescription;
        _schedule.Employer_Name = data.employerName;
        _schedule.Slot = data.slot;
        _schedule.Day = data.day;

        _schedule.Plumber = plumber;

        getRepository(_scheduleEntity)
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
            })
    }
});

// Delete plumber
app.delete('/api/v1/plumbers/delete/:_id', async (req: Request, res: Response, next: NextFunction) => {
    let code = res.statusCode;
    let _plumberId = req.params._id;
    await getRepository(_plumberEntity).removeById(_plumberId)
        .then( (plumber) => {
            res.json({
                code,
                msg: 'plumber deleted'
            });
        })
        .catch( (err) => {
            res.json({
                code,
                err
            });
            next();
        })
});

// initialize port
const port = process.env.PORT || 8001;

app.listen(port, async (error: any) => {
    (error) ? await console.error(error) : await console.log('App running on http://localhost:' + port);
});
