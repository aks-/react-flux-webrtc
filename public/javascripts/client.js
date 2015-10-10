var WebrtcApp = require('./components/WebrtcApp.react');
var React = require('react');
var mountNode = document.querySelector('#webrtc-app');

React.render(<WebrtcApp />, mountNode);
