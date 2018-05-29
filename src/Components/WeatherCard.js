import React, { Component } from 'react';

import Day from './Day';
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
          <div className="row">
            <div className='col-xs-12'>
              <div className='col-xs-12'>
                <h3>7 Day forecast:</h3>
                <hr className="hr"/>
              </div>
              <div id="days" className="col-xs-12 flex">
                {forecast}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-row jc-fe attribution">
          <h6><i className="fa fa-bolt"></i> Powered by DarkSky</h6>
        </div>
      </div>
    );
  }
}

export default WeatherCard;