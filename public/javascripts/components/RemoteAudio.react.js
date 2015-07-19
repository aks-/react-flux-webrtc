var React = require('react');
var CallStore = require('../stores/CallStore');
var AudioElement = require('./AudioElement.react');
var ListenerMixin = require('./ListenerMixinForLocalAudioVideo');

function getRemoteAudioStateFromStore() {
  return CallStore.getRemoteAudio();
}

var RemoteAudio = React.createClass({
  mixins: [ListenerMixin],
  getInitialState: function() {
    return getRemoteAudioStateFromStore();
  },
  render: function() {
    return (
      <div id="remoteAudio"></div>
    );
  }
});

module.exports = RemoteAudio;
