var React = require('react');
var LocalVideo = require('./LocalVideo.react');
var RemoteVideo = require('./RemoteVideo.react');

var VideoSection = React.createClass({
  render: function() {
    return (
      <div id="videos">
        <LocalVideo />
        <RemoteVideo />
      </div>
    );
  },
});

module.exports = VideoSection;
