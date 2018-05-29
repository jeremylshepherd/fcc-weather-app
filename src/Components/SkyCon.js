import React from 'react';

const Skycons = window.Skycons;

class SkyCon extends React.Component {
  constructor(props) {
    super(props);
    
    this.attachSkycon = this.attachSkycon.bind(this);
  };
  
  attachSkycon() {
    const icons = new Skycons({ color: this.props.color });
    let list = [
        "clear-day", "clear-night", "partly-cloudy-day",
        "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
        "fog"
    ];
    let weatherType = list[list.indexOf(this.props.icon)];
    let element = this.refs.canvas;
    icons.set(element, weatherType);
    icons.play();
  }
  
  componentDidMount() {
    this.attachSkycon();
  }
  
  render() {
    const klass = this.props.klass ? `${this.props.klass}` : null;
    return (
      <figure className={klass}>
        <canvas ref="canvas" iconname={this.props.icon} className={this.props.icon}/>
      </figure>
    );
  }
}

export default SkyCon;