const express = require('express');
const router = express.Router();

// plumber model
const _Plumbers = require('../models/plumber.model');

router.post('/', (req, res) => {
    let code = res.statusCode;
    let data = req.body;

    _Plumbers.findOne({
        userName: data.username
    })
    .then((user) => {
        if (!user) {
            _Plumbers.create({
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username,
                email: data.email,
                cellNumber: data.cellNumber
            })
            .then( (plumber) => {
                res.json({
                    code,
                    plumber
                });
            })
        } else {
            res.json({
                code,
                msg: 'Username already exists!'
            });
        }
    })
});

module.exports = router;
