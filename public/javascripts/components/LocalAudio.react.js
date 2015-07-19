var React = require('react');
var AudioElement = require('./AudioElement.react');
var CallStore = require('../stores/CallStore');
var MakeCallActionCreators = require('../actions/MakeCallActionCreators');
var ListenerMixin = require('./ListenerMixin');

function getLocalAudioStateFromStore() {
  return CallStore.getLocalAudio();
}

var LocalAudio = React.createClass({
  mixins: [ListenerMixin],
  getInitialState: function() {
    return getLocalAudioStateFromStore();
  },
  render: function() {
    return (
      <div id="localAudio">
        <AudioElement
          src={audio.src}
          muted={audio.muted}
        />
      </div>
    );
  },
});

module.exports = LocalAudio;
