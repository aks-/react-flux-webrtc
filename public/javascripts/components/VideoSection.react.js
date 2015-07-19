var React = require('react');

var VideoSection = React.createClass({
  getInitialState: function() {
    return {
      localVideoSrc: null,
      remoteVideoSrc: null
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
      <div id="videos">
        <video id="localVideo" autoPlay muted src={this.state.localVideoSrc}></video>
        <video id="remoteVideo" autoPlay src={this.state.remoteVideoSrc}></video>
      </div>
    );
  },
  _onChange: function() {
    this.setState(getVideoSrc());
  }
});

module.exports = VideoSection;
