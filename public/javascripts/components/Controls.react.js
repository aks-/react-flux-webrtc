var React = require('react');
var CallActionCreators = require('../actions/CallActionCreators');

var startCallState = {
  audioEnabled: false,
  videoEnabled: false,
  hangUpEnabled: true
};
var hangUpState = {
  audioEnabled: true,
  videoEnabled: true,
  hangUpEnabled: false
};

var Controls = React.createClass({
  getInitialState: function() {
    return {
      audioEnabled: true,
      videoEnabled: true,
      hangUpEnabled: false
    };
  },
  render: function() {
    var audioEnabled = this.state.audioEnabled;
    var videoEnabled = this.state.videoEnabled;
    var hangUpEnabled = this.state.hangUpEnabled;
    return (
      <div id="controls">
        <button id="audioCall" onClick={this.initiateAudioCall} disabled={!audioEnabled}>Audio Call</button>
        <button id="videoCall" onClick={this.initiateVideoCall} disabled={!videoEnabled}>Video Call</button>
        <button id="hangup" onClick={this.hangup} disabled={!hangUpEnabled}>Hangup</button>
      </div>
    );
  },
  this.initiateAudioCall: function() {
    var action = CallActionCreators.makeAudioCall;
    this._initiateAction(action, 'call');
  },
  this.initialteVideoCall: function() {
    var action = CallActionCreators.makeVideoCall;
    this._initiateAction(action, 'call');
  },
  this.hangUp: function() {
    var action = CallActionCreators.hangCall;
    this._initiateAction(action);
  },
  this._initiateAction: function(action, type) {
    if (type && type == 'call') {
      var state = startCallState;
    } else {
      var state = hangUpState;
    }
    action();
    this.setState(state);
  },
});

module.exports = CallButtons;
