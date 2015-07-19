var React = require('react');
var AudioElement = require('./AudioElement.react');

var RemoteAudio = React.createClass({
  render: function() {
    return (
      <div id="remoteAudio"></div>
    );
  }
});

module.exports = RemoteAudio;
