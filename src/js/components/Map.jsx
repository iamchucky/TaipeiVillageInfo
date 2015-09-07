import React from 'react';

export default React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
    var mapElement = this.refs.map.getDOMNode();
    var map;

    google.maps.event.addDomListener(window, 'load', () => {
      map = new google.maps.Map(mapElement, {
        zoom: 12,
        center: { lat: 25.08, lng: 121.55 },
        disableDefaultUI: true
      });
    });
  },

  render() {
    return (<div className="map col-no-margin" ref="map"></div>);
  }
});
