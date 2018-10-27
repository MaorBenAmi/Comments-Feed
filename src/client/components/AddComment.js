import React, { Component } from 'react';
import '../css/index.css';

class AddComment extends Component {
    constructor(props){
        super(props);
        this.state ={
            error:''
        }
        this.onAddNewComment = this.onAddNewComment.bind(this);
        this.onSuccessAddNewComment = this.onSuccessAddNewComment.bind(this);
        this.onErrorAddNewComment = this.onErrorAddNewComment.bind(this);
        this.email = React.createRef();
        this.comment = React.createRef();
    }
    
    
    onAddNewComment(){
        let aEmail = this.email.current.value;
        let aComment = this.comment.current.value;
        
        if(aEmail === "" && aComment === ""){
            alert('Email and Comment may not be empty');
            return;
        }
        
        let aNewComment = {
            email: aEmail,
            comment: aComment
        };
        
        let aData = JSON.stringify(aNewComment);
        
        fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: aData
        }).then(response => response.json())
          .then(data => this.onSuccessAddNewComment(data))
          .catch(error => this.onErrorAddNewComment(error));
    }
    
    onSuccessAddNewComment(pData) {
        this.props.onNewCommentAdded(pData.data);
        this.email.current.value ="";
        this.comment.current.value ="";
    }
    
    onErrorAddNewComment(pData) {
        alert('Email is invalid');
    }
    
    
  render() {
    return (
        <div className='add-new'>
          <input className='input add-email' placeholder='Email' type='text' ref={this.email}/>
          <textarea className='input add-comment' placeholder='Message' ref={this.comment}></textarea>
          <button className='send-msg btn btn-primary' onClick={this.onAddNewComment}>SUBMIT</button>
        </div>

    );
  }
}

export default AddComment;
