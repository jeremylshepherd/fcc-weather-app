
//Updated to reflect the deprecation of the geolocation API for non-https demos.
//20180515 Updated with server that wraps DarkSky API to minimize ajax calls and protect API key. Heroku free server so it may take 30seconds to respond

//20180520: converting to React
//Weather data is an object with 2 sub-objects and for some reason the second sub-objects is returning separately from the first. SOLVED by assigning the sub-objects to their own state.

//20180525: Background updates to first weathercard's icon, but is slow. Probably due to WeatherContainer populating Weather card's data outside of Main App state. Should probably move to main state or use REDUX. Moved to Main App

//20180526: Wrapped remaining API calls to server to minimize API calls/more graceful errors/more control, fixed card removal bug

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const getDay = (n) => (new Date(+n * 1000)).getDay();

// const copy = i => JSON.parse(JSON.stringify(i));
const log = (label, value) => console.log(label, value);

const server = `https://fcc-weather-server.herokuapp.com`;

// const setDIR = (n) => {
//   let dir = n > 348.75 || n <= 11.25   ? 'N'   :
//             n > 11.25  && n <= 33.75   ? 'NNE' :
//             n > 33.75  && n <= 56.25   ? 'NE'  :
//             n > 56.25  && n <= 78.75   ? 'ENE' :
//             n > 78.75  && n <= 101.25  ? 'E'   :
//             n > 101.25 && n <= 123.75  ? 'ESE' :
//             n > 123.75 && n <= 146.25  ? 'SE'  :
//             n > 146.25 && n <= 168.75  ? 'SSE' :
//             n > 168.75 && n <= 191.25  ? 'S'   :
//             n > 191.25 && n <= 213.75  ? 'SSW' :
//             n > 213.75 && n <= 236.25  ? 'SW'  :
//             n > 235.25 && n <= 258.75  ? 'WSW' :
//             n > 258.75 && n <= 281.25  ? 'W'   :
//             n > 281.25 && n <= 303.75  ? 'WNW' :
//             n > 303.75 && n <= 326.25  ? 'NW'  : 
//             'NNW';
//   return dir;
// }

const Pre = (props) => {
  return (
    <pre>{JSON.stringify({...props}, null, 2)}</pre>
  );
}

// const getWeather = (lat, lon, func) => {
//   const weathInfo =`${server}/api/${lat},${lon}`;
//   const cityState =`${server}/api/coords/${lat},${lon}`;
//   return fetch(cityState).then(response => response.json()).then(response => {
//     let newObj = {};
//     newObj.location = response.address;
//     newObj.zip = response.zip;
//     return fetch(weathInfo).then(res => res.json()).then(res => {
//       const obj = res.apiResponse;

//       let c = obj.currently;
//       const d = obj.daily.data.slice(0, 7);

//       const options = {
//         weekday: "short",
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//         timeZoneName: "short"
//       };

       

//       newObj.precip = (c.precipProbability * 100).toFixed();
//       newObj.temp = Math.round(c.temperature);
//       newObj.icon = c.icon;
//       newObj.datetime = (new Date(c.time * 1000)).toLocaleString("en-us", options);
//       newObj.conditions = c.summary;
//       newObj.humidity = (+c.humidity * 100).toFixed();

//       let windBear = c.windBearing;
//       let dir = setDIR(windBear);

//       newObj.windSpeed = `${c.windSpeed.toFixed(1)}mph ${dir}`;

//       const sunOpts = { hour: "numeric", minute: "numeric" };
//       newObj.sunrise = new Date(
//         d[0].sunriseTime * 1000
//       ).toLocaleTimeString("en-US", sunOpts);
//       newObj.sunset = new Date(
//         d[0].sunsetTime * 1000
//       ).toLocaleTimeString("en-US", sunOpts);


//       const daily = d.map((d) => {
//         let obj = {};
//         obj.temperatureMax = d.temperatureMax;
//         obj.temperatureMin = d.temperatureMin;
//         obj.icon = d.icon;
//         obj.summary = d.summary;
//         obj.time = d.time;
//         return obj;
//       });
//       return func(newObj, daily);
//     })
//     .catch(err => console.log(err));
//   }).catch(err => console.log(err));
// }

// class SkyCon extends React.Component {
//   constructor(props) {
//     super(props);
    
//     this.attachSkycon = this.attachSkycon.bind(this);
//   };
  
//   attachSkycon() {
//     const icons = new Skycons({ color: this.props.color });
//     let list = [
//         "clear-day", "clear-night", "partly-cloudy-day",
//         "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
//         "fog"
//     ];
//     let weatherType = list[list.indexOf(this.props.icon)];
//     let element = this.refs.canvas;
//     icons.set(element, weatherType);
//     icons.play();
//   }
  
//   componentDidMount() {
//     this.attachSkycon();
//   }
  
//   render() {
//     const klass = this.props.klass ? `${this.props.klass}` : null;
//     return (
//       <figure className={klass}>
//         <canvas ref="canvas" iconname={this.props.icon} className={this.props.icon}/>
//       </figure>
//     );
//   }
// }

// const Nav = props => {
//   return (
//     <nav className="navbar navbar-default">
//       <div className="container">
//         <div className="flex-nav">
//           <span className="navbar-brand">
//             <i className="fa fa-free-code-camp"></i>
//             <span> Weather App</span>      
//           </span>
//           <span className="btn btn-default plus" data-toggle="modal" data-target="#myModal">
//             <i className="fa fa-plus" id="addLocation"></i>    
//           </span>
//         </div>
//       </div>
//     </nav>
//   );
// }

// class Modal extends React.Component {
//   constructor(props) {
//     super(props);
    
//     this.state = {
//       zip: ''
//     }
    
//     this.addZip = this.addZip.bind(this);
//     this.submitZip = this.submitZip.bind(this);
    
//   }
  
//   addZip(e) {
//     const value = e.target.value;
//     this.setState({ zip: value });
//   }
  
//   submitZip() {
//     this.props.submitZip(this.state.zip);
//     this.setState({ zip: '' });
//   }
  
//   render() {
//     return  (
//       <div className="modal fade" tabIndex="-1" role="dialog" id="myModal">
//       <div className="modal-dialog" role="document">
//         <div className="modal-content">
//           <div className="modal-header">
//             <button 
//               type="button" 
//               className="close" 
//               data-dismiss="modal" 
//               aria-label="Close">
//               <span aria-hidden="true">&times;</span>
//             </button>
//             <h4 className="modal-title">Add Location By Zip Code</h4>
//           </div>
//           <div className="modal-body">
//             <input id="zip" 
//               className="form-control" 
//               placeholder="Enter 5 digit Zip Code"
//               value={this.state.zip}
//               onChange={this.addZip}/>
//           </div>
//           <div className="modal-footer">
//             <button type="button" 
//               className="btn btn-default" 
//               data-dismiss="modal">
//                 Cancel
//             </button>
//             <button 
//               type="button" 
//               className="btn btn-primary" 
//               onClick={this.submitZip} 
//               data-dismiss="modal">
//                 Add Location
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//     );
//   }
// }

// const Alert = props => {
//   let success = props.success ? 'success': 'danger';
//   return (
//     <div className={`alert alert-${success} alert-dismissible`} role="alert">
//       <button type="button" className="close" data-dismiss="alert" aria-label="Close">
//         <span aria-hidden="true">&times;</span></button>
//       <strong>{props.flag}, </strong> {props.msg}.
//     </div>
//   );
// };

// const Day = (props) => {
//   return (
//     <div className="day" >
//       <span>{DAYS[getDay(props.time)]}</span>
//       <SkyCon color="#222" icon={props.icon} />
//       <span>{`${Math.round(props.temperatureMin)}\u2109`}</span><br/>
//       <span>{`${Math.round(props.temperatureMax)}\u2109`}</span>
//     </div>
//   );
// };

// class WeatherCardClass extends React.Component {
//   constructor(props) {
//     super(props);
    
//     this.removeLocation = this.removeLocation.bind(this);
//   }
  
//   removeLocation() {
//     this.props.removeLocation(this.props.data.zip);
//   }
  
//   render() {
//     let data = this.props.data;
//     let forecast = this.props.daily.map((d) => <Day key={d.time} {...d}/>);
//     let zip = data.zip;
//     return (
//       <div className='container weatherBoard' id={zip} key={zip} >
//         <div className="user-weather">
//           <span className="btn btn-default pull-right" onClick={this.removeLocation}>
//             <i className="fa fa-times-circle-o fa-2x pull-right"/>
//           </span>
//           <div className="row">
//             <div className="col-xs-12">
//               <h1 className="mg-left">{data.location}</h1>
//               <h5 className="mg-left">{data.datetime}</h5>
//               <h3 className="mg-left">{data.conditions}</h3>
//             </div>
//           </div>
//           <div className="row">
//             <div className='icontemp'>            
//               <div className="col-xs-6 flex-block">
//                 <div className={`flex-row`}>
//                   <SkyCon color="#222" icon={data.icon} klass="hero"/>
//                   <div className="col-xs-6">
//                     <h2 className="temp">{`${data.temp}\u2109`}</h2>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div id='blocks' className="col-xs-6">
//               <div className="block infoBlock flex-block">
//                 <div className="flex-row">
//                   <h4>Humidity:</h4><h4>{`${data.humidity}%`}</h4>
//                 </div>
//                 <div className="flex-row"><h4>Wind:</h4><h4>{data.windSpeed}</h4></div>
//                 <div className="flex-row"><h4>Precipitation:</h4><h4>{`${data.precip}%`}</h4></div>
//                 <div className="flex-row"><h4>Sunrise:</h4><h4>{data.sunrise}</h4></div>
//                 <div className="flex-row"><h4>Sunset:</h4><h4>{data.sunset}</h4></div>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className='col-xs-12'>
//               <div className='col-xs-12'>
//                 <h3>7 Day forecast:</h3>
//                 <hr className="hr"/>
//               </div>
//               <div id="days" className="col-xs-12 flex">
//                 {forecast}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex-row jc-fe attribution">
//           <h6><i className="fa fa-bolt"></i> Powered by DarkSky</h6>
//         </div>
//       </div>
//     );
//   }
// };

class App extends React.Component {
  constructor() {
    super();
    
    this.state = {      
      zips: [],
      places: [],
      weatherData: [],
      icon: '',
      alert: null
    }
    
    this.submitZip = this.submitZip.bind(this);
    this.setBackGround = this.setBackGround.bind(this);
    this.clearAlert = this.clearAlert.bind(this);
    this.removeLocation = this.removeLocation.bind(this);
    this.getBackGround = this.getBackGround.bind(this);
    this.weatherTest = this.weatherTest.bind(this);
  }
  
  submitZip(n) {
    let zipArray = copy(this.state.zips);
    if(zipArray.indexOf(+n) !== -1) {
      let alert = {
        msg: 'This zipcode is already present',
        success: false,
        flag: 'Action not Completed'
      }
      return this.setState({ alert: alert});
    }
    const zipURL = `${server}/api/zip/${+n}`
    fetch(zipURL).then(response => response.json()).then(res => {
        let obj = {}
        obj.lat = res.lat;
        obj.lon = res.lon;
        obj.current = false;
      
        let alert = {
          msg: 'You have added a new location',
          success: true,
          flag: 'Woo hoo'
        };
        let newZips = copy(this.state.zips);
        let newPlaces = copy(this.state.places);
        newZips.push(+n);
        newPlaces.push(obj);
        
        this.setState({
          zips: newZips,
          places: newPlaces,
          alert: alert
        });
      this.weatherTest();
      console.log('Ran in submitZip');
    });
  }
  
  clearAlert(msg) {
        setTimeout(() => {
            this.setState({ alert: null });
        }, 8000);
    }
  
  weatherTest() {
    if(this.state.places.length) {
      let weather = this.state.places.map((p) => {
        let func = (a, b) =>{
            let obj = {};
            obj.data = a;
            obj.daily = b;
            return obj;
        };
          return getWeather(p.lat, p.lon, func).then(res => res);
      });
      Promise.all(weather).then(res => this.setState({ weatherData: res }));
    }else{
      let alert = {
      msg: `Please add a location`,
      success: false,
      flag: 'Sorry'
    };
      this.setState({ alert: alert });
    }
  }
  
  getCurrentLocation() {
    let err = () => {
      const obj = {
        msg: "Geo-location not available. Please add location manually.",
        success: false,
        flag: 'Sorry'
      };
    };

    const getLoc = (position) => {
      let places = copy(this.state.places);
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      const currentLocation = {
        lat: lat,
        lon: lon,
        current: true
      };
      let alert = {
        msg: 'Your current location has been added',
        success: true,
        flag: 'Woo Hoo'
      };
      let cityState =`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&sensor=false`;
      fetch(cityState).then(res => res.json()).then(res => {
        let address = res.results[0].formatted_address.split(',').join('').split(' ');
        let zip = address[address.length - 2];
        let zipArray = copy(this.state.zips);
        places.unshift(currentLocation);
        zipArray.unshift(zip);
      
        this.setState({ places: places, alert: alert, zips: zipArray });
        this.weatherTest();
        this.getBackGround();
      });        
    }

    const navOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    
    navigator.geolocation.getCurrentPosition(getLoc, err, navOptions);
  }
  
  getBackGround() {
    let places = copy(this.state.places);
    if(places.length > 0) {
      let first = places[0];
      const weathInfo =`https://fcc-weather-server.herokuapp.com/api/${first.lat},${first.lon}`;
      fetch(weathInfo).then(response => response.json()).then(response => {
        let icon = response.apiResponse.currently.icon;
        this.setBackGround(icon);
      });
    }
  }
  
  setBackGround(condition) {   
    const srcRoot = `https://static.pexels.com/photos`;
    const opts = `center/cover no-repeat fixed`
    let URL;
    switch (condition) {
      case "partly-cloudy-night":
        URL = `url('${srcRoot}/534077/pexels-photo-534077.jpeg') ${opts}`;
        break;
      case "clear-day":
        URL = `url('${srcRoot}/359558/pexels-photo-359558.jpeg') ${opts}`;
        break;
      case "clear-night":
        URL = `url('${srcRoot}/33688/delicate-arch-night-stars-landscape.jpg') ${opts}`;
        break;
      case "rain":
        URL = `url('${srcRoot}/1553/glass-rainy-car-rain.jpg') ${opts}`;
        break;
      case "snow":
        URL = `url('${srcRoot}/235621/pexels-photo-235621.jpeg') ${opts}`;
        break;
      case "wind":
        URL = `url('${srcRoot}/149671/pexels-photo-149671.jpeg') ${opts}`;
        break;
      case "sleet":
        URL = `url('${srcRoot}/235621/pexels-photo-235621.jpeg') ${opts}`;
        break;
      case "fog":
        URL = `url('${srcRoot}/5230/road-fog-foggy-mist.jpg') ${opts}`;
        break;
      case "cloudy":
        URL = `url('${srcRoot}/120257/london-120257.jpeg') ${opts}`;
        break;
      case "partly-cloudy-day":
        URL = `url('${srcRoot}/301952/pexels-photo-301952.jpeg') ${opts}`;
        break;
      default:
        URL = `url('${srcRoot}/672/sea-beach-clouds-cloudy.jpg') ${opts}`;
    }
    document.body.style.background = URL;
  }
  
  removeLocation(id) {
    let zip = id;
    let zips = copy(this.state.zips);
    let places = copy(this.state.places);
    let newWeather = copy(this.state.weatherData);    
    places.splice(zips.indexOf(zip));
    newWeather.splice(zips.indexOf(zip));
    zips.splice(zips.indexOf(zip));
    let alert = {
      msg: `You have removed ${zip}`,
      success: true,
      flag: 'Okay'
    };
    this.setState({ zips: zips, places: places, weatherData: newWeather, alert: alert });
  }
  
  componentDidMount() {
    const { places } = this.state;
    if(places.length === 0 || places[0].current !== true){
      this.getCurrentLocation();
    }
    if(this.state.alert !== null) {
      this.clearAlert();
    }
    this.weatherTest();
    this.getBackGround();
  }
  
  componentDidUpdate() {
    if(this.state.alert !== null) {
      this.clearAlert();
    }
  }
  
  render() {
    let weatherData = copy(this.state.weatherData);
    const cards = weatherData.map((p, i) => {
      let item = p.data !== null ?  <WeatherCardClass {...p} removeLocation={this.removeLocation} key={i}/>: null;
      return item;
    });
    let alert = this.state.alert ? <Alert {...this.state.alert} />: null;
    return (
      <div>
        <Nav />
        <div id="alert">{alert}</div>
        <div ref="cards" className="cards">{cards}</div>
        <Modal submitZip={this.submitZip} />
      </div>
    );
  }
  
}

ReactDOM.render(<App />, document.getElementById('app'));