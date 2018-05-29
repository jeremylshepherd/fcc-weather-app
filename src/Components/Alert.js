import React from 'react';

const Alert = props => {
    let success = props.success ? 'success' : 'danger';
    return (
        <div className={`alert alert-${success} alert-dismissible`} role="alert">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <strong>{props.flag}, </strong> {props.msg}.
        </div>
    );
};

export default Alert;
