var React = require('react');

var VideoSection = React.createClass({
  render: function() {
    return (
      <div id="videos">
        <video id="localVideo" autoplay muted></video>
        <video id="remoteVideo" autoplay></video>
      </div>
    );
  }
});

module.exports = VideoSection;
