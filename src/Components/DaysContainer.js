import React from 'react';

const DaysContainer = props => {
    return (
        <div className="row">
            <div className="col-xs-12">
                <div className="col-xs-12">
                    <h3>7 Day forecast:</h3>
                    <hr className="hr" />
                </div>
                <div id="days" className="col-xs-12 flex">
                    {props.forecast}
                </div>
            </div>
        </div>
    );
};

export default DaysContainer;
