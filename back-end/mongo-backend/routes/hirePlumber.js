const express = require('express');
const router = express.Router();

// plumber model
const _plumbers = require('../models/plumber.model');

router.put('/:_id', (req, res) => {
    let code = req.statusCode;
    let _id = req.params._id;
    let data = req.body;
    let schedule = {
        day: data.day,
        slot: data.slot,
        employer: data.employer,
        employerNumber: data.employerNumber,
        jobDescription: data.jobDescription
    }

    _plumbers.findOneAndUpdate({
        _id: _id
    }, {
        $push: {
            schedules: schedule
        }
    })
    .then(() => {
        _plumbers.findOne({
            _id: _id
        })
        .then((plumber) => {
            res.json({
                plumber
            });
        })
        .catch((err) => {
            res.json({
                code,
                err
            });
        })
    })
    .catch((err) => {
        res.json({
            code,
            err
        });
    })
});

module.exports = router;
