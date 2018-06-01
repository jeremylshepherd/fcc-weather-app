import React from 'react';

const Location = props => {
    return (
        <div className="col-xs-11">
            <h1 className="mg-left">{props.location}</h1>
            <h5 className="mg-left">{props.datetime}</h5>
            <h3 className="mg-left">{props.conditions}</h3>
        </div>
    );
};

export default Location;
