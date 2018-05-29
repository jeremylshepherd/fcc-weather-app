import React, { Component } from 'react';

import DarkSky from './DarkSky';
import Day from './Day';
import DaysContainer from './DaysContainer';
import Location from './Location';
import SkyCon from './SkyCon';
import TimeTemp from './TimeTemp';
import WindRainSun from './WindRainSun';

class WeatherCard extends Component {
  constructor(props) {
    super(props);
    
    this.removeLocation = this.removeLocation.bind(this);
  }
  
  removeLocation() {
    this.props.removeLocation(this.props.data.zip);
  }
  
  render() {
    let data = this.props.data;
    let forecast = this.props.daily.map((d) => <Day key={d.time} {...d}/>);
    let zip = data.zip;
    return (
      <div className='container weatherBoard' id={zip} key={zip} >
        <div className="user-weather">
          <span className="btn btn-default pull-right" onClick={this.removeLocation}>
            <i className="fa fa-times-circle-o fa-2x pull-right"/>
          </span>
          <Location
              location={data.location}
              datetime={data.datetime}
              conditions={data.conditions} />
          <div className="row">
            <TimeTemp
              color="#222" 
              icon={data.icon}
              temp={data.temp}/>
            <WindRainSun
                zip={zip}
                humidity={data.humidity}
                windSpeed={data.windSpeed}
                precip={data.precip}
                sunrise={data.sunrise}
                sunset={data.sunset}/>
          </div>
          <DaysContainer forecast={forecast} />
        </div>
        <DarkSky />
      </div>
    );
  }
}

export default WeatherCard;