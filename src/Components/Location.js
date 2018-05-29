import React, { Component } from 'react';

const Location = props => {
    return (
        <div className="row">
            <div className="col-xs-12">
                <h1 className="mg-left">{props.location}</h1>
                <h5 className="mg-left">{props.datetime}</h5>
                <h3 className="mg-left">{props.conditions}</h3>
            </div>
        </div>
    );
};

export default Location;