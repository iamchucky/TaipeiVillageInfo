import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';

export default React.createClass({
  getDefaultProps() {
    return {
      district: '',
      stats: {}
    };
  },

  handleStatOnClick(name) {
    var self = this;
    return (e) => {
      self.props.onStatClick(name);
    };
  },

  render() {
    let {district, stats} = this.props;
    stats = stats[district];
    if (!stats) {
      return (
        <div></div>
      );
    }

    return (
      <ListGroup className="stat-list">
        {Object.keys(stats).map(statName =>
          <div key={statName}><span onClick={this.handleStatOnClick(statName)}>{statName}</span>: {stats[statName]} </div>
        )}
      </ListGroup>
    );
  }
});
