import React, { Component } from 'react';
import copy from './Actions/copy';
import getWeather from './Actions/getWeather';

import Alert from './Components/Alert';
import Modal from './Components/Modal';
import Nav from './Components/Nav';
import WeatherCard from './Components/WeatherCard';

const server = `https://fcc-weather-server.herokuapp.com`;

class App extends Component {
    constructor() {
        super();

        this.state = {
            zips: [],
            places: [],
            weatherData: [],
            icon: '',
            alert: null,
            orientation: 'landscape'
        };

        this.submitZip = this.submitZip.bind(this);
        this.setBackGround = this.setBackGround.bind(this);
        this.clearAlert = this.clearAlert.bind(this);
        this.removeLocation = this.removeLocation.bind(this);
        this.getBackGround = this.getBackGround.bind(this);
        this.weatherTest = this.weatherTest.bind(this);
    }

    detectOrientationChange = () => {
        if (window.innerWidth < window.innerHeight && this.state.orientation !== 'portrait') {
            this.setState({ orientation: 'portrait' });
            this.getBackGround();
        } else if (
            window.innerWidth > window.innerHeight &&
            this.state.orientation !== 'landscape'
        ) {
            this.setState({ orientation: 'landscape' });
            this.getBackGround();
        } else {
            console.log('no change needed');
        }
    };

    submitZip(n) {
        let zipArray = copy(this.state.zips);
        if (zipArray.indexOf(+n) !== -1) {
            let alert = {
                msg: 'This zipcode is already present',
                success: false,
                flag: 'Action not Completed'
            };
            return this.setState({ alert: alert });
        }
        const zipURL = `${server}/api/zip/${+n}`;
        fetch(zipURL)
            .then(response => response.json())
            .then(res => {
                let obj = {};
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
        if (this.state.places.length) {
            let weather = this.state.places.map(p => {
                let func = (a, b) => {
                    let obj = {};
                    obj.data = a;
                    obj.daily = b;
                    return obj;
                };
                return getWeather(p.lat, p.lon, func).then(res => res);
            });
            Promise.all(weather).then(res => this.setState({ weatherData: res }));
        } else {
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
            const alert = {
                msg: 'Geo-location not available. Please add location manually.',
                success: false,
                flag: 'Sorry'
            };
            this.setState({ alert: alert });
        };

        const getLoc = position => {
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
            let cityState = `${server}/api/coords/${lat},${lon}`;
            fetch(cityState)
                .then(res => res.json())
                .then(res => {
                    let zip = res.zip;
                    let zipArray = copy(this.state.zips);
                    places.unshift(currentLocation);
                    zipArray.unshift(zip);

                    this.setState({ places: places, alert: alert, zips: zipArray });
                    this.weatherTest();
                    this.getBackGround();
                });
        };

        const navOptions = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(getLoc, err, navOptions);
    }

    getBackGround() {
        let places = copy(this.state.places);
        if (places.length > 0) {
            let first = places[0];
            const weathInfo = `${server}/api/${first.lat},${first.lon}`;
            fetch(weathInfo)
                .then(response => response.json())
                .then(response => {
                    let icon = response.apiResponse.currently.icon;
                    this.setBackGround(icon);
                });
        }
    }

    setBackGround(condition) {
        const srcRoot =
            this.state.orientation === 'portrait'
                ? `${process.env.PUBLIC_URL}/assets/mobile.`
                : `${process.env.PUBLIC_URL}/assets/`;
        const opts = `center/cover no-repeat fixed`;
        let cond = !condition ? 'default' : condition;
        let URL = `url('${srcRoot}${cond}.jpg') ${opts}`;
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
        if (places.length === 0 || places[0].current !== true) {
            this.getCurrentLocation();
        }
        if (this.state.alert !== null) {
            this.clearAlert();
        }
        window.addEventListener('resize', this.detectOrientationChange);
        window.addEventListener('deviceorientation', this.detectOrientationChange);
        this.weatherTest();
        this.getBackGround();
        this.detectOrientationChange();
    }

    componentDidUpdate() {
        if (this.state.alert !== null) {
            this.clearAlert();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.detectOrientationChange);
        window.removeEventListener('deviceorientation', this.detectOrientationChange);
    }

    render() {
        let weatherData = copy(this.state.weatherData);
        const cards = weatherData.map((p, i) => {
            let item =
                p.data !== null ? (
                    <WeatherCard {...p} removeLocation={this.removeLocation} key={i} />
                ) : null;
            return item;
        });
        let alert = this.state.alert ? <Alert {...this.state.alert} /> : null;
        return (
            <div>
                <Nav />
                <div id="alert">{alert}</div>
                <div ref="cards" className="cards">
                    {cards}
                </div>
                <Modal submitZip={this.submitZip} />
            </div>
        );
    }
}
export default App;
