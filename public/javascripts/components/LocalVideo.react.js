var React = require('react');
var VideoElement = require('./VideoElement.react');

var LocalVideo = React.createClass({
  render: function() {
    return (
      <div id="localVideo"></div>
    );
  }
});

module.exports = LocalVideo;
