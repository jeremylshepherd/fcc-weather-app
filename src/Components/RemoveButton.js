import React from 'react';

export default class RemoveButton extends React.Component{
    removeLocation = () => {
        this.props.removeLocation(this.props.zip);
    }
    render() {
        return (
            <span className="btn btn-default pull-right" onClick={this.removeLocation}>
                <i className="fa fa-times-circle-o fa-2x pull-right"/>
            </span>
        );
    }
}