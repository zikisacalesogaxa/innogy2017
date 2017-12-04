const getSchedules = require('../libs/getSchedule');
const express = require('express');
const router = express.Router();

// plumber model
let _plumbers = require('../models/plumber.model');

router.get('/day/:_day/slot/:_slot', (req, res) => {
    let slot = req.params._slot;
    let day = req.params._day;
    let code = res.statusCode;
    
    _plumbers.find({})
    .then((plumbers) => {
        let schedules = getSchedules(plumbers, day, slot);
            res.json({
                schedules
            });
        })
        .catch((err) => {
            res.json({
                code,
                err
            })
        })

});

module.exports = router;
