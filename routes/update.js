const express = require('express');
const router = express.Router();
const main = require('../js/index')

router.use('/', function (req, res, next) {
    main.getMessageHistory()
    next()
})

module.exports = router;
