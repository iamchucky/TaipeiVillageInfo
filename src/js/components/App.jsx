import React, {PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Map from './Map.jsx';
import StatList from './StatList.jsx';
import NoteList from './NoteList.jsx';

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
