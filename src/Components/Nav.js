import React from 'react';

const Nav = props => {
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="flex-nav">
          <span className="navbar-brand">
            <i className="fa fa-free-code-camp"></i>
            <span> Weather App</span>      
          </span>
          <span className="btn btn-default plus" data-toggle="modal" data-target="#myModal">
            <i className="fa fa-plus" id="addLocation"></i>    
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Nav;