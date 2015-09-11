import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import ListGroup from 'react-bootstrap/lib/ListGroup';

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
          <div className="note-panel" key={note.agency}>
            <Panel> 
              <div className="note-head">{note.agency}</div>
              <div className="note-body">{note.val}</div>
            </Panel>
          </div>
        )}
      </ListGroup>
    );
  }
});
