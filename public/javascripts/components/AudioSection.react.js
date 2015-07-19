var React = require('react');

var AudioSection = React.createClass({
  getInitialState: function() {
    return {
      localAudioSrc: null,
      remoteAudioSrc: null
    }; 
  },
  componentDidMount: function() {
    CallStore.addChangeListener(this._onChange); 
  },
  componentWillUnmount: function() {
    CallStore.removeChangeListener(this._onChange);
  },
  render: function() {
    return (
      <div id="audios">
        <video id="localAudio" autoPlay muted src={this.state.localAudioSrc}></video>
        <video id="remoteAudio" autoPlay src={this.state.remoteAudioSrc}></video>
      </div>
    );
  },
  _onChange: function() {
    this.setState(getAudioSrc());
  }
});

module.exports = AudioSection;
