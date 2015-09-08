import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';

export default React.createClass({
  getDefaultProps() {
    return {
      district: '',
      stats: {}
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
        {stats.map(stat =>
          <div key={stat.name}> {stat.name}: {stat.val} </div>
        )}
      </ListGroup>
    );
  }
});
