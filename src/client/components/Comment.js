import React, { Component } from 'react';
import '../css/flip.css';

class Comment extends Component {
    constructor(props){
        super(props);
        this.container = React.createRef();
        this.onClickAvatar = this.onClickAvatar.bind(this);
    }
    
    onClickAvatar(){
        this.container.current.classList.toggle("flip");
    }
    
    
  render() {
    return (
        <div className='flip-container' ref={this.container}>
            <div className='flipper'>
              <div className='comment front'>
                <img className='avatar' alt='avatar' src={this.props.src} onClick={this.onClickAvatar}/>
                <div className = 'body'>
                    <span>
                        {this.props.email}
                    </span>
                    <p>{this.props.comment}</p>
                </div>
              </div>
             <div className='comment back'>
                <img className='avatar' alt='avatar' src={this.props.src}  onClick={this.onClickAvatar}/>
                <div className = 'body'>
                    <span>
                        {this.props.email}
                    </span>
                    <p>Last Active: {new Date(this.props.lastActive).toLocaleString()}</p>
                </div>
              </div>
            </div>
        </div>
    );
  }
}

export default Comment;