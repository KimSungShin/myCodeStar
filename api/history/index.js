/**
 * Created by 유광식 on 2017-01-07.
 */

const express = require('express');
const router = express.Router();
const ctrl = require('./history.controller');


// svn test
router.use( ctrl.create );

module.exports = router;
