var React = require('react');
var VideoSection = require('./VideoSection.react');
var AudioSection = require('./AudioSection.react');
var Controls = require('./Controls.react');

var WebrtcApp = React.createClass({
  render: function() {
    return (
      <div className="main-section">
        <div id="error-message"></div>
        <VideoSection />
        <AudioSection />
        <Controls />
      </div>
    );
  }
});

module.exports = WebrtcApp;
