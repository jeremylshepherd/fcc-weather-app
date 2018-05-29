import React from 'react';

import DAYS from '../Helpers/DAYS';
import getDay from '../Actions/getDay';

import SkyCon from './SkyCon';

const Day = props => {
    return (
        <div className="day">
            <span>{DAYS[getDay(props.time)]}</span>
            <SkyCon color="#222" icon={props.icon} autoplay={true} />
            <br />
            <span>{`${Math.round(props.temperatureMin)}\u2109`}</span>
            <br />
            <span>{`${Math.round(props.temperatureMax)}\u2109`}</span>
        </div>
    );
};

export default Day;
