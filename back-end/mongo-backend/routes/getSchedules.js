const getSchedules = require('../libs/getSchedule');
const express = require('express');
const router = express.Router();

// plumber model
let _plumbers = require('../models/plumber.model');

router.get('/day/:_day/slot/:_slot', (req, res) => {
    let code = res.statusCode;
    let day = req.params._day;
    let slot = req.params._slot;
    
    _plumbers.find({})
    .then((plumbers) => {
        let schedules = getSchedules(plumbers, day, slot);
            res.json({
                code,
                schedules
            });
        })

});

module.exports = router;
