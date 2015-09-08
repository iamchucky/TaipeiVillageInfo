import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import {ajax} from '../utils';

export default React.createClass({
  getDefaultProps() {
    return {
      district: ''
    };
  },

  getInitialState() {
    return {
      stats: {}
    };
  },

  componentDidMount() {
    var self = this;
    // get the google sheet info
    
    var url = 'https://spreadsheets.google.com/feeds/list/1g9N5D2u69ctIu_2-G2U1FuGLHsFCCzm7c3zTNt9fb98/od6/public/full'
    ajax('GET', url, function(xmlhttp) {
      var xml = xmlhttp.responseXML;
      var entries = xml.getElementsByTagName('entry');
      var data = {};
      for (let e = 0; e < entries.length; ++e) {
        var child = entries[e].children;
        var title = entries[e].getElementsByTagName('title');
        if (!title) continue;
        title = title[0].textContent;
        data[title] = []
        for (let c = 0; c < child.length; ++c) {
          let ch = child[c];
          let nodeName = ch.nodeName;
          let filterOut = ['gsx:行政區', 'gsx:區', 'gsx:里'];
          if (!nodeName.startsWith('gsx:') || filterOut.indexOf(nodeName) >= 0) continue;

          let attr = ch.nodeName.replace('gsx:', '');
          let val = ch.textContent;
          data[title].push({ name:attr, val:val });
        }
      }
      self.setState({ stats: data });
    });
  },

  render() {
    let {district} = this.props;
    let stats = this.state.stats[district];
    if (!stats) {
      return (
        <div></div>
      );
    }

    return (
      <ListGroup className="stat-list">
        {stats.map(stat =>
          <div> {stat.name}: {stat.val} </div>
        )}
      </ListGroup>
    );
  }
});
