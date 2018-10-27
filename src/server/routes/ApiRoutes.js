const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.use('/comments', require('./CommentsRoute'));

module.exports = router;