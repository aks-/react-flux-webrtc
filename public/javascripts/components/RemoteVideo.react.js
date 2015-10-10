var React = require('react');
var CallStore = require('../stores/CallStore');
var VideoElement = require('./VideoElement.react');
var ListenerMixin = require('./ListenerMixin');

function getRemoteVideoStateFromStore() {
  return CallStore.getRemoteVideo();
}

var RemoteVideo = React.createClass({
  mixins: [ListenerMixin],
  getInitialState: function() {
    return getRemoteVideoStateFromStore();
  },
  render: function() {
    return (
      <div id="remoteVideo">
        <VideoElement
          src={video.src}
          muted={video.muted}
        />
      </div>
    );
  }
});

module.exports = RemoteVideo;
