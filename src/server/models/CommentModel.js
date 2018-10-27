'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new mongoose.Schema({
   email:{
       type: String
   },
    comment:{
        type: String
    },
    avatar_md5:{
        type: String
    },
    date_posted:{
        type: Date,
        default: ()=> new Date()
    }
}).index({ 'date_posted': 1});

const Comments = mongoose.model('comments', commentSchema);


module.exports = Comments;

