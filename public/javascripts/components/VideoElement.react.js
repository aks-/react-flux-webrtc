var React = require('react');

var VideoElement = React.createClass({
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

module.exports = VideoElement;
