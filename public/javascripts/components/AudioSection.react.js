var React = require('react');

var AudioSection = React.createClass({
  render: function() {
    return (
      <div id="audios">
        <video id="localAudio" autoPlay muted></video>
        <video id="remoteAudio" autoPlay></video>
      </div>
    );
  }
});

module.exports = AudioSection;
