var React = require('react');

var AudioElement = React.createClass({
  render: function() {
    var props = this.props;
    return (
      <video
      src={props.video.src}
      muted={props.video.muted}
      autoPlay
      />
    );
  }
});

module.exports = AudioElement;
