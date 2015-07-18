var React = require('react');

var VideoSection = React.createClass({
  render: function() {
    return (
      <div id="videos">
        <video id="localVideo" autoPlay muted></video>
        <video id="remoteVideo" autoPlay></video>
      </div>
    );
  }
});

module.exports = VideoSection;
