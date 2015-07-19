var React = require('react');
var AudioElement = require('./AudioElement.react');

var LocalAudio = React.createClass({
  render: function() {
    return (
      <div id="localAudio"></div>
    );
  }
});

module.exports = LocalAudio;
