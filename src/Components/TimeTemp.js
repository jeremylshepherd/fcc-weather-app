import React from 'react';
import SkyCon from './SkyCon';

const TimeTemp = props => {
    return (
        <div className="icontemp">
            <div className="col-xs-6 flex-block">
                <div className={`flex-row`}>
                    <SkyCon color={props.color} icon={props.icon} />
                    <div className="col-xs-6">
                        <h2 className="temp">{`${props.temp}\u2109`}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeTemp;
