import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Panel from 'react-bootstrap/lib/Panel';

export default React.createClass({
  getDefaultProps() {
    return {
      notes: []
    };
  },

  render() {
    let {notes} = this.props;

    return (
      <ListGroup className="note-list">
        {notes.map(note =>
          <Panel className="note-panel"> 
            <div className="note-head">{note.agency}</div>
            <div className="note-body">{note.val}</div>
          </Panel>
        )}
      </ListGroup>
    );
  }
});
