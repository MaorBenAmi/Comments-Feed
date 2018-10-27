import React, { Component } from 'react';
import '../css/loader.css';

class Loader extends Component {
    

  render() {
    return (
        <div className={this.props.isLoading ? 'loader' : 'fade-out'}>
        </div>
    );
  }
}

export default Loader;
