var React = require('react');

var AudioSection = React.createClass({
  render: function() {
    return (
      <div id="audios">
        <video id="localAudio" autoplay muted></video>
        <video id="remoteAudio" autoplay></video>
      </div>
    );
  }
});

module.exports = AudioSection;
