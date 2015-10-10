var React = require('react');
var assign = require('object-assign');
var CallStore = require('../stores/CallStore');
var CallActionCreators = require('../actions/CallActionCreators');
var ListenerMixin = require('./ListenerMixin.js');

function getState() {
  return CallStore.getControlsState()
}

var Controls = React.createClass({
  mixins: [ListenerMixin],
  getInitialState: function() {
    return assign({}, getState());
  },
  render: function() {
    var audioDisabled = this.state.type ? true : false;
    var videoDisabled = this.state.type ? true : false;
    var hangUpDisabled = this.state.type ? false: true;
    return (
      <div id="controls">
      <button id="audioCall" onClick={this.initiateAudioCall} disabled={audioDisabled}>Audio Call</button>
      <button id="videoCall" onClick={this.initiateVideoCall} disabled={videoDisabled}>Video Call</button>
      <button id="hangup" onClick={this.hangup} disabled={hangUpDisabled}>Hangup</button>
      </div>
    );
  },
  initiateAudioCall: function() {
    var action = CallActionCreators.makeAudioCall;
  },
  initialteVideoCall: function() {
    var action = CallActionCreators.makeVideoCall;
  },
  hangUp: function() {
    var action = CallActionCreators.hangCall;
  },
});

module.exports = CallButtons;
