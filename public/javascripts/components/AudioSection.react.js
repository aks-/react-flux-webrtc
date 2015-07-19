var React = require('react');
var LocalAudio = require('./LocalAudio.react');
var RemoteAudio = require('./RemoteAudio.react');

var AudioSection = React.createClass({
  render: function() {
    return (
      <div id="videos">
        <LocalAudio />
        <RemoteAudio />
      </div>
    );
  },
});

module.exports = AudioSection;
