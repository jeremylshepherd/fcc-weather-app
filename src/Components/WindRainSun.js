import React from 'react';

const WindRainSun = props => {
    return (
        <div id='blocks' className="col-xs-6">
            <div className="block infoBlock flex-block">
                <div className="flex-row">
                    <h4>Humidity:</h4><h4>{`${props.humidity}%`}</h4>
                </div>
                <div className="flex-row"><h4>Wind:</h4><h4>{props.windSpeed}</h4></div>
                <div className="flex-row"><h4>Precipitation:</h4><h4>{`${props.precip}%`}</h4></div>
                <div className="flex-row"><h4>Sunrise:</h4><h4>{props.sunrise}</h4></div>
                <div className="flex-row"><h4>Sunset:</h4><h4>{props.sunset}</h4></div>
            </div>
        </div>
    );
};

export default WindRainSun;