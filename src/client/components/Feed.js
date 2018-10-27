import React, { Component } from 'react';
import AddComment from './AddComment';
import Comment from './Comment';
import Loader from './Loader';
import Filter from './Filter';
import '../css/index.css';

class Feed extends Component {
    constructor(props) {
    super(props);
    this.state = {
        isLoading : true,
        comments : [],
        users:{}
    };    
    this.onSuccessGetAllComments = this.onSuccessGetAllComments.bind(this);
    this.onAddNewComment = this.onAddNewComment.bind(this);
    this.onSuccessFilter = this.onSuccessFilter.bind(this);
  }

    componentDidMount() {
        fetch('/api/comments')
        .then(response => response.json())
        .then(data => this.onSuccessGetAllComments(data.data));
    }
    
    onSuccessGetAllComments(pData) { 
        let aUsers = pData.users;
        let aUsersDic = {};
        for(let i = 0; i < aUsers.length; i++) {
            aUsersDic[aUsers[i]._id] = aUsers[i].lastCommentDate;
        }

         this.setState({ 
            comments: pData.comments,
            isLoading : false,
             users: aUsersDic
         });
    }
    
    onAddNewComment(pNewComment) {
        let aComments = this.state.comments;
        let aUserEmail = pNewComment.email;
        let aUsers = this.state.users;
        aUsers[aUserEmail] = pNewComment.date_posted;
        
        aComments.splice(0, 0, pNewComment);
         this.setState({ 
            comments: aComments,
             users: aUsers
         });
    }
    
    onSuccessFilter(pData) {
        this.setState({
            comments: pData
        });
    }
      
  render() {
    return (
      <div className='comments'>
        <Loader isLoading={this.state.isLoading}/>
        <div className={this.state.isLoading ? 'inner-fade-out' : 'inner fade-in'}>
            <AddComment onNewCommentAdded={this.onAddNewComment}/>
            <Filter onSuccessFilter={this.onSuccessFilter} />
            {this.state.comments.map(comment =>
                <Comment key={comment._id} email={comment.email}  src={"https://www.gravatar.com/avatar/" + comment.avatar_md5} comment={comment.comment} lastActive={ this.state.users[comment.email] }/>
            )}
        </div>
      </div>
    );
  }
}

export default Feed;
