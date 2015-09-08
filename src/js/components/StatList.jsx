import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';

export default React.createClass({
  getDefaultProps() {
    return {
      stats: {}
    };
  },

  render() {
    let {stats} = this.props;

    return (
      <ListGroup className="stat-list">
        {stats.items.map(stat =>
          <div> {stat.name}: {stat.val} </div>
        )}
      </ListGroup>
    );
  }
});
