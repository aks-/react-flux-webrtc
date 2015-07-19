var React = require('react');
var VideoElement = require('./VideoElement.react');
var CallStore = require('../stores/CallStore');
var MakeCallActionCreators = require('../actions/MakeCallActionCreators');
var ListenerMixin = require('./ListenerMixin');

function getLocalVideoStateFromStore() {
  return CallStore.getLocalVideo();
}

var LocalVideo = React.createClass({
  mixins: [ListenerMixin],
  getInitialState: function() {
    return getLocalVideoStateFromStore();
  },
  render: function() {
    return (
      <div id="localVideo">
        <VideoElement
          src={video.src}
          muted={video.muted}
        />
      </div>
    );
  },
});

module.exports = LocalVideo;
