import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import PackLayout from 'react-layout-pack';

export default React.createClass({
  getDefaultProps() {
    return {
      district: '',
      notes: {}
    };
  },

  componentDidUpdate() {
    if (this.refs.pack) {
      this.refs.pack.reposition();
    }
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
      <PackLayout className="packed-layout" ref="pack" tag="div" itemMargin={0}>
        {notes.map(note =>
          <div className="note-panel col-xs-12 col-sm-6 col-lg-4" key={note.agency}>
            <Panel> 
              <div className="note-head">{note.agency}</div>
              <div className="note-body">{note.val}</div>
            </Panel>
          </div>
        )}
      </PackLayout>
    );
  }
});
