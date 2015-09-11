import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';

export default React.createClass({
  getDefaultProps() {
    return {
      district: '',
      stats: {}
    };
  },
  
  getInitialState() {
    return {
      selectedStat: ''
    };
  },

  handleStatOnClick(name) {
    var self = this;
    return (e) => {
      self.props.onStatClick(name);
      self.setState({ selectedStat: name });
    };
  },

  render() {
    let {district, stats} = this.props;
    let {selectedStat} = this.state;
    stats = stats[district];
    if (!stats) {
      return (
        <div></div>
      );
    }

    return (
      <ListGroup className="stat-list">
        {Object.keys(stats).map(statName =>
          <div key={statName}><span className={selectedStat == statName ? 'selected stat-name': 'stat-name'} onClick={this.handleStatOnClick(statName)}>{statName}</span>: {stats[statName]} </div>
        )}
      </ListGroup>
    );
  }
});
