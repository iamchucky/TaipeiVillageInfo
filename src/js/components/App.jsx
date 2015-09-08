import React, {PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Map from './Map.jsx';
import StatList from './StatList.jsx';
import NoteList from './NoteList.jsx';
import Tabletop from 'tabletop';

export default React.createClass({
  getDefaultProps() {
    return {}
  },

  getInitialState() {
    return {
      title: '士林區三玉里',
      stats: {},
      notes: {}
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
          newState.stats[district] = [];

          for (let attr in e) {
            if (filterOut.indexOf(attr) >= 0) continue;

            newState.stats[district].push({ name:attr, val:e[attr]});
          }
        }

        // for notes
        let notesObj = data['各局筆記'];
        for (let e of notesObj.elements) {
          var district = e['行政區']
          newState.notes[district] = [];

          for (let attr in e) {
            if (filterOut.indexOf(attr) >= 0) continue;

            newState.notes[district].push({ agency:attr, val:e[attr]});
          }
        }

        self.setState(newState);
      }
    });
  },

  render() {
    let {title, notes, stats} = this.state;
    return (
      <div className="container-fluid full-height">
        <div className="row full-height">
          <div className="col-sm-6 left-pane full-height">
            <div className="left-top">{title}</div>
            <StatList district={title} stats={stats} />
            <NoteList district={title} notes={notes} />
          </div>
          <div className="col-sm-6 full-height">
            <Map onSelect={this.handleMapDistrictSelect} district={title} />
          </div>
        </div>
      </div>
    );
  }
});
