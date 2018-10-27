import React, { Component } from 'react';
import '../css/index.css';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.filterBy = React.createRef();
        this.onFilterComments = this.onFilterComments.bind(this);
        this.onSuccessFilter = this.onSuccessFilter.bind(this);
    }
    
    onFilterComments() {
        let aFilterBy = this.filterBy.current.value;
        fetch('/api/comments/filter?filter=' + aFilterBy)
        .then(response => response.json())
        .then(data => this.onSuccessFilter(data.data));
    }
    
    onSuccessFilter(pData) {
        this.props.onSuccessFilter(pData);
    }
    
    
  render() {
    return (
    <div className="input-group stylish-input-group">
           <span className="input-group-addon">
                <button type="submit" onClick={this.onFilterComments} >
                    <span className="glyphicon glyphicon-search"></span>
                </button>  
            </span>
            <input type="text" className="form-control"  placeholder="Filter" ref={this.filterBy}/>
        </div>
    );
  }
}

export default Filter;
