import setDIR from '../Helpers/setDIR';

const server = `https://fcc-weather-server.herokuapp.com`;

const getWeather = (lat, lon, func) => {
  const weathInfo =`${server}/api/${lat},${lon}`;
  const cityState =`${server}/api/coords/${lat},${lon}`;
  return fetch(cityState).then(response => response.json()).then(response => {
    let newObj = {};
    newObj.location = response.address;
    newObj.zip = response.zip;
    return fetch(weathInfo).then(res => res.json()).then(res => {
      const obj = res.apiResponse;

      let c = obj.currently;
      const d = obj.daily.data.slice(0, 7);

      const options = {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "short"
      };

      newObj.precip = (c.precipProbability * 100).toFixed();
      newObj.temp = Math.round(c.temperature);
      newObj.icon = c.icon;
      newObj.datetime = (new Date(c.time * 1000)).toLocaleString("en-us", options);
      newObj.conditions = c.summary;
      newObj.humidity = (+c.humidity * 100).toFixed();

      let windBear = c.windBearing;
      let dir = setDIR(windBear);

      newObj.windSpeed = `${c.windSpeed.toFixed(1)}mph ${dir}`;

      const sunOpts = { hour: "numeric", minute: "numeric" };
      newObj.sunrise = new Date(
        d[0].sunriseTime * 1000
      ).toLocaleTimeString("en-US", sunOpts);
      newObj.sunset = new Date(
        d[0].sunsetTime * 1000
      ).toLocaleTimeString("en-US", sunOpts);


      const daily = d.map((d) => {
        let obj = {};
        obj.temperatureMax = d.temperatureMax;
        obj.temperatureMin = d.temperatureMin;
        obj.icon = d.icon;
        obj.summary = d.summary;
        obj.time = d.time;
        return obj;
      });
      return func(newObj, daily);
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
};

export default getWeather;