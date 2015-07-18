var React = require('react');
var VideoSection = require('./VideoSection.react');
var AudioSection = require('./AudioSection.react');
var CallButtons = require('./CallButtons.react');

var WebrtcApp = React.createClass({
  render: function() {
    return (
      <div className="main-section">
        <div id="error-message"></div>
        <VideoSection />
        <AudioSection />
        <CallButtons />
      </div>
    );
  }
});

module.exports = WebrtcApp;
