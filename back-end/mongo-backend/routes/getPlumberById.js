const express = require('express');
const router = express.Router();

// plumber model
let _plumbers = require('../models/plumber.model');

router.get('/:_id', (req, res) => {
    let plumberId = req.params._id;
    let code = res.statusCode;
    _plumbers.findOne({ _id: plumberId })
    .then((plumber) => {
            res.json(plumber);
        })
        .catch((err) => {
            res.json({
                code,
                err
            })
        })

});

module.exports = router;
