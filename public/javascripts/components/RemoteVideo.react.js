var React = require('react');
var VideoElement = require('./VideoElement.react');

var RemoteVideo = React.createClass({
  render: function() {
    return (
      <div id="remoteVideo"></div>
    );
  }
});

module.exports = RemoteVideo;
