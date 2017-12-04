const express = require('express');
const router = express.Router();

// plumber model
const _Plumbers = require('../models/plumber.model');

router.get('/', (req, res) => {
    let code = res.statusCode;
    _Plumbers.find({})
        .then( (plumbers) => {
            res.json(plumbers);
        })
        .catch( (err) => {
            res.json({
                code,
                err
            });
        })
});

module.exports = router;
