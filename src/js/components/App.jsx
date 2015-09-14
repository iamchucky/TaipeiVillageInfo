import React, {PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Map from './Map.jsx';
import StatList from './StatList.jsx';
import NoteList from './NoteList.jsx';

var colorDivision = 10;

function getStatNorm(data) {
  // find max and min of the values
  var min = [];
  var max = [];
  var attrs = [];

  // get attributes
  for (let district in data) {
    var districtStats = data[district];
    for (let attr in districtStats) {
      min.push(Number.MAX_VALUE);
      max.push(0);
      attrs.push(attr);
    }
    break;
  }

  for (let district in data) {
    var districtStats = data[district];
    for (var i = 0; i < attrs.length; ++i) {
      let val = parseFloat(districtStats[attrs[i]]);
      if (val < min[i]) {
        min[i] = val;
      }
      if (val > max[i]) {
        max[i] = val;
      }
    }
  }

  var out = {};
  for (var i = 0; i < attrs.length; ++i) {
    var a = attrs[i];
    out[a] = {
      scale: 0.8 / (max[i] - min[i]),
      min: min[i]
    }
  }

  return out;
}

function getColorStats(data) {
  var bins = [];
  // figure out the score bin
  for (var i = 0; i < colorDivision; ++i) {
    var opacity = 0.8 / colorDivision * i;
    bins.push(opacity);
  }

  // get attributes
  var attrs = [];
  for (let district in data) {
    var districtStats = data[district];
    for (let attr in districtStats) {
      attrs.push(attr);
    }
    break;
  }

  // get the binned color opacity
  var colorStats = {};
  for (var i = 0; i < attrs.length; ++i) {
    var stats = [];
    for (let district in data) {
      var districtStats = data[district];
      let val = parseFloat(districtStats[attrs[i]]);
      stats.push({ district, val });
    }

    stats.sort(function(a, b) {
      return a.val - b.val;
    });

    for (var j = 0; j < stats.length; ++j) {
      var {district, val} = stats[j];
      if (!colorStats[district]) {
        colorStats[district] = {};
      }
      // bin the stats
      var binIndex = Math.floor(j / stats.length * colorDivision);

      colorStats[district][attrs[i]] = bins[binIndex];
    }
  }
  return colorStats;
}

export default React.createClass({
  getDefaultProps() {
    return {}
  },

  getInitialState() {
    return {
      title: '士林區三玉里',
      stats: {},
      notes: {},
      statNorm: {},
      colorStats: {}
    }
  },
  
  handleMapDistrictSelect(district) {
    this.setState({ title: district });
  },

  componentDidMount() {
    var self = this;
    // get the google sheet info
    
    
    var key = '1g9N5D2u69ctIu_2-G2U1FuGLHsFCCzm7c3zTNt9fb98';
    Tabletop.init({
      key,
      callback: (data, tabletop) => {
        var newState = { stats:{}, notes: {} };
        
        // for stats
        let statsObj = data['統計'];
        var filterOut = statsObj.column_names.slice(0, 3);
        for (let e of statsObj.elements) {
          var district = e['行政區']
          newState.stats[district] = {};

          for (let attr in e) {
            if (filterOut.indexOf(attr) >= 0) continue;

            newState.stats[district][attr] = e[attr];
          }
        }

        // for districtColors
        newState.statNorm = getStatNorm(newState.stats);
        newState.colorStats = getColorStats(newState.stats);

        // for notes
        let notesObj = data['各局筆記'];
        for (let e of notesObj.elements) {
          var district = e['行政區']
          newState.notes[district] = [];

          for (let attr in e) {
            if (filterOut.indexOf(attr) >= 0) continue;

            newState.notes[district].push({ agency:attr, val:(e[attr] || '無')});
          }
        }

        self.setState(newState);
      }
    });
  },

  handleOnStatClick(statName) {
    this.refs.map.showDataWithOpacity(statName);
  },

  render() {
    let {title, notes, stats, statNorm, colorStats} = this.state;
    return (
      <div className="container-fluid full-height">
        <div className="row full-height">
          <div className="col-sm-3 left-pane full-height">
            <div className="left-top">{title}</div>
            <StatList district={title} stats={stats} onStatClick={this.handleOnStatClick} />
            <NoteList district={title} notes={notes} />
          </div>
          <div className="col-sm-9 full-height">
            <Map ref="map" onSelect={this.handleMapDistrictSelect} district={title} stats={stats} statNorm={statNorm} colorStats={colorStats} />
          </div>
        </div>
      </div>
    );
  }
});
