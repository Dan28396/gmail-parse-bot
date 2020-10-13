const express = require('express');
const router = express.Router();
const fs = require('fs');
const main = require('../js/index')

router.use('/', function (req, res, next) {
    main.getAuthorized(main.startWatching)
    next()
})

router.post('/', function (req, res, next) {

});

module.exports = router;
