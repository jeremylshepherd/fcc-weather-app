import React from 'react';

const Nav = props => {
    return (
        <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
                <div className="flex-nav">
                    <span className="navbar-brand">
                        <i className="fa fa-free-code-camp" />
                        <span> Weather</span>
                    </span>
                    <span
                        className="btn btn-default plus"
                        data-toggle="modal"
                        data-target="#myModal">
                        <i className="fa fa-plus" id="addLocation" />
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
