import React from 'react';
import {ajax} from '../utils';

export default React.createClass({
  getDefaultProps() {
    return {
      district: ''
    };
  },

  getInitialState() {
    return {
      regionName: ''
    };
  },

  componentDidMount() {
    var self = this;
    var mapElement = this.refs.map.getDOMNode();
    var map;
    var clickedFeature;

    function registerListeners() {
      map.data.addListener('click', function(event) {
        var district = event.feature.getProperty('name');
        var belong = event.feature.getProperty('belong');
        if (belong) {
          district = belong + district;
        }
        map.data.revertStyle();
        clickedFeature = event.feature;
        map.data.overrideStyle(clickedFeature, { fillColor: 'red', strokeColor: 'red', strokeWeight: 3});

        self.props.onSelect(district);
      });

      map.data.addListener('mouseover', function(event) {
        map.data.revertStyle();
        map.data.overrideStyle(event.feature, { strokeWeight: 3});
        map.data.overrideStyle(clickedFeature, { fillColor: 'red', strokeColor: 'red', strokeWeight: 3});
        
        var district = event.feature.getProperty('name');
        var belong = event.feature.getProperty('belong');
        if (belong) {
          district = belong + district;
        }

        // set title
        self.setState({ regionName: district });
      });

      map.data.addListener('mouseout', function(event) {
        map.data.revertStyle();
        map.data.overrideStyle(clickedFeature, { fillColor: 'red', strokeColor: 'red', strokeWeight: 3});

        // clear title
        self.setState({ regionName: '' });
      });
    };

    google.maps.event.addDomListener(window, 'load', () => {
      map = new google.maps.Map(mapElement, {
        zoom: 12,
        center: { lat: 25.08, lng: 121.55 },
        disableDefaultUI: true
      });

      // set default color
      map.data.setStyle((feature) => {
        return {
          fillColor: 'gray',
          strokeColor: 'gray',
          strokeWeight: 1
        }
      });

      // get the kml geometries
      ajax('GET', 'villages.kml', function(xmlhttp) {
        map.data.addGeoJson(toGeoJSON.kml(xmlhttp.responseXML));

        map.data.forEach((feature) => {
          var district = feature.getProperty('name');
          var belong = feature.getProperty('belong');
          if (belong) {
            district = belong + district;
          }

          if (district == self.props.district) {
            clickedFeature = feature;
          }
        });

        map.data.overrideStyle(clickedFeature, { fillColor: 'red', strokeColor: 'red', strokeWeight: 3});
      });
      
      // get the village names

      registerListeners();
    });

  },

  render() {
    let state = this.state;
    return (
      <div className="col-no-margin full-height">
        <div className="map" ref="map"></div>
        <div className="map-region-name">{state.regionName}</div>
      </div>
    );
  }
});
