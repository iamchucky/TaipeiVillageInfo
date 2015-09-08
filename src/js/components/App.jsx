import React, {PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Map from './Map.jsx';
import StatList from './StatList.jsx';
import NoteList from './NoteList.jsx';
import {ajax} from '../utils';

export default React.createClass({
  propTypes: {
    stats: PropTypes.array.isRequired,
    notes: PropTypes.array.isRequired,
    onAddTask: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      title: '士林區德華里',
      stats: {
        items: [{
          name: '測試1',
          val: 2
        }, {
          name: '測試2',
          val: 3
        }]
      },
      notes: [{
        agency: '民政局',
        val: '這個里的里民...'
      }, {
        agency: '社會局',
        val: '弱勢族群比較多'
      }, {
        agency: '社會局',
        val: '弱勢族群比較多'
      }, {
        agency: '社會局',
        val: '弱勢族群比較多'
      }]
    }
  },

  componentDidMount() {
    var self = this;
    // get the google sheet info
    var url = 'https://spreadsheets.google.com/feeds/list/1g9N5D2u69ctIu_2-G2U1FuGLHsFCCzm7c3zTNt9fb98/od6/private/full'
    ajax('GET', url, function(xmlhttp) {
      var xml = xmlhttp.responseXML;
      console.log(xml);

    });
  },

  render() {
    let {onAddTask, onClear, title, stats, notes} = this.props;
    return (
      <div className="container-fluid full-height">
        <div className="row full-height">
          <div className="col-sm-6 left-pane full-height">
            <div className="left-top">{title}</div>
            <StatList stats={stats} />
            <NoteList notes={notes} />
          </div>
          <div className="col-sm-6 full-height">
            <Map />
          </div>
        </div>
      </div>
    );
  }
});
