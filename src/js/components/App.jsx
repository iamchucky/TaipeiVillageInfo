import React, {PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Map from './Map.jsx';
import StatList from './StatList.jsx';
import NoteList from './NoteList.jsx';

export default React.createClass({
  propTypes: {
    onSelect: PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {}
  },

  getInitialState() {
    return {
      title: '士林區三玉里'
    }
  },
  
  handleMapDistrictSelect(district) {
    this.setState({ title: district });
  },

  render() {
    let {title} = this.state;
    return (
      <div className="container-fluid full-height">
        <div className="row full-height">
          <div className="col-sm-6 left-pane full-height">
            <div className="left-top">{title}</div>
            <StatList district={title} />
            <NoteList district={title} />
          </div>
          <div className="col-sm-6 full-height">
            <Map onSelect={this.handleMapDistrictSelect} district={title} />
          </div>
        </div>
      </div>
    );
  }
});
