import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';

export default React.createClass({
  getDefaultProps() {
    return {
      notes: []
    };
  },

  render() {
    let {notes} = this.props;

    return (
      <ListGroup className="col-no-margin">
        {notes.map(note =>
          <div> {note.agency}: {note.val} </div>
        )}
      </ListGroup>
    );
  }
});
