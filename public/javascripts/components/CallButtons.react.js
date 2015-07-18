var React = require('react');

var CallButtons = React.createClass({
  render: function() {
    return (
      <div id="controls">
        <button id="audioCall">Audio Call</button>
        <button id="videoCall">Video Call</button>
        <button id="hangup" disabled>Hangup</button>
      </div>
    );
  }
});

module.exports = CallButtons;
