import React from 'react';

const RemoveButton = props => {
    return (
        <span className="btn btn-default pull-right" onClick={props.removeLocation}>
            <i className="fa fa-times-circle-o fa-2x pull-right"/>
        </span>
    );
};

export default RemoveButton;