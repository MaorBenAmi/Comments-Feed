let Comments = require('../models/CommentModel');
let validator = require('validator');
let md5 = require('md5');

exports.get_comments = function (req, res, next) {

    Comments.aggregate([
        {
            $sort: {
                'date_posted': -1
            }
        }
    ],function(err, comments){
        if(err){
            return res.status(500).json({"success": false, "data": err, "message":"Error get all comments"});
        }
        
        Comments.aggregate([
            {
                $sort:{
                    'date_posted': -1
                }
            },
            {
                $group:{
                    _id: '$email',
                    lastCommentDate:{
                        $first: '$date_posted'
                    }
                }
            }
        ],function(err, users){
            if(err) {
                return res.status(500).json({"success": false, "data": err, "message":"Error get all comments"});
            }
            let aReturnObject= {
                comments: comments,
                users: users
            };
            res.status(200).json({"success": true, "data": aReturnObject, "message": "Success get all comments"});

        });
    });    
}



exports.add_comment = function (req, res, next) {
    let aEmail = req.body.email;
    let aComment = req.body.comment;
    
    if(!validator.isEmail(aEmail)) {
        return res.status(500).json({"success": false, "data": null, "message": "Validation error - email is not valid"});
    }
    
    
    let aNewComment = new Comments();
    aNewComment.email = aEmail;
    aNewComment.comment = aComment;
    aNewComment.avatar_md5 = createHashFromEmail(aEmail);
    aNewComment.save(function(err, aNewComment){
         if(err){
            return res.status(200).json({"success": false, "data": err, "message": "Validation error - email is not valid"});
        }
        
        res.status(200).json({"success": true, "data": aNewComment, "message": "Success save new comment"});
    });   
    
}


exports.filter_documents = function(req, res, next) {
    let aFilter = req.query.filter 
    
    Comments.aggregate([
        {
            $match:{
              email: { $regex: aFilter, $options: 'g' }
            }
        },
        {
            $sort:{
               'date_posted': -1 
            }
        }
    ],function(err, comments){
        if(err){
            return res.status(200).json({"success": false, "data": err, "message": "Error filter comments"});
        }
        
        res.status(200).json({"success": true, "data": comments, "message": "Success filter comments"});    
    });
}


function createHashFromEmail(pEmail) {
    let aHashedEmail;
    aHashedEmail = pEmail.trim();
    aHashedEmail = aHashedEmail.toLowerCase();
    return md5(aHashedEmail);
}
