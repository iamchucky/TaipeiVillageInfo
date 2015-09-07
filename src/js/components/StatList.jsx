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
      <ListGroup className="col-no-margin left-top">
        <h1>{stats.title}</h1>
        {stats.items.map(stat =>
          <div> {stat.name}: {stat.val} </div>
        )}
      </ListGroup>
    );
  }
});
