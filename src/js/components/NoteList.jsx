import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Panel from 'react-bootstrap/lib/Panel';

export default React.createClass({
  getDefaultProps() {
    return {
      district: '',
      notes: {}
    };
  },

  render() {
    let {district, notes} = this.props;
    notes = notes[district];
    if (!notes) {
      return (
        <div>讀取中</div>
      );
    }

    return (
      <ListGroup className="note-list">
        {notes.map(note =>
          <Panel className="note-panel" key={note.agency}> 
            <div className="note-head">{note.agency}</div>
            <div className="note-body">{note.val}</div>
          </Panel>
        )}
      </ListGroup>
    );
  }
});
