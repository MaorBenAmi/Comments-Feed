'use strict';
let express = require('express');
let router = express.Router();
let controller = require('../controllers/CommentsController');


router.route('/')
    .get(controller.get_comments)
    .post(controller.add_comment);

router.route('/filter')
    .get(controller.filter_documents);

module.exports = router;