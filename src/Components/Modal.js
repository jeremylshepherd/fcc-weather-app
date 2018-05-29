import React, { Component } from 'react';

class Modal extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      zip: ''
    };
    
    this.addZip = this.addZip.bind(this);
    this.submitZip = this.submitZip.bind(this);
  }
  
  addZip(e) {
    const value = e.target.value;
    this.setState({ zip: value });
  }
  
  submitZip() {
    this.props.submitZip(this.state.zip);
    this.setState({ zip: '' });
  }
  
  render() {
    return  (
      <div className="modal fade" tabIndex="-1" role="dialog" id="myModal">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button 
              type="button" 
              className="close" 
              data-dismiss="modal" 
              aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title">Add Location By Zip Code</h4>
          </div>
          <div className="modal-body">
            <input id="zip" 
              className="form-control" 
              placeholder="Enter 5 digit Zip Code"
              value={this.state.zip}
              onChange={this.addZip}/>
          </div>
          <div className="modal-footer">
            <button type="button" 
              className="btn btn-default" 
              data-dismiss="modal">
                Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={this.submitZip} 
              data-dismiss="modal">
                Add Location
            </button>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Modal;