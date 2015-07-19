var bluebird = require('bluebird');
var WebrtcAppDispatcher = require('../dispatcher/WebrtcAppDispatcher');
var WebrtcAppConstants = require('../constants/WebrtcAppConstrants');
var CallActionCreators = require('../actions/CallActionCreators');
var serverConfig = null;
var localPeerConnection, remotePeerConnection;

var WebrtcAPI = {
  makeAudioCall: function() {
    var constraints = {audio: true};
    this._call(constraints, WebrtcAppConstants.ATTACH_AUDIO_SOURCE);
  },
  makeVideoCall: function() {
    var constraints = {video: true, audio: true};
    this._call(constraints, WebrtcAppConstants.ATTACH_VIDEO_SOURCE);
  },
  hangup: function() {
    bluebird.promisify(function() {
      localPeerConnection = null;
      remotePeerConnection = null;
    })
    .then(function() {
      //TODO add action to change buttons state
      CallActionCreators.afterCallHanged();
      console.log('disconnected succesfully');
    })
    .fail(function(error) {
      console.log('Something went wrong ' + error.message);
      //TODO attach error message
    });
  },
  _call: function(constraints, event) {
    var getUserMedia = navigator.getUserMedia;
    bluebird.promisify(getUserMedia(constraints))
    .then(gotStream)
    .then(function(stream) {
      var objectUrl = URL.createObjectURL(stream);
      CallActionCreators.attachToSrc(objectUrl, event);
      return {stream: stream, event: event};
    })
    .then(createConnection)
    .fail(function() {
      //TODO create error-message component and change starte using dispatcher
    });
  }
};

function gotStream(stream) {
  console.log('Received local stream');
  localStream = stream;
  return localStream;
}

function createConnection(obj) {
  var stream = obj.stream, event = obj.event;
  localPeerConnection = new RTCPeerConnection(serverConfig);
  localPeerConnection.onicecandidate = gotLocalIceCandidate;
  remotePeerConnection = new RTCPeerConnection(serverConfig);
  remotePeerConnection.onicecandidate = gotRemoteIceCandidate;
  remotePeerConnection.onaddstream = gotRemoteStream;
  localPeerConnection.addStream(stream);
  localPeerConnection.createOffer(gotLocalDescription, handleError);
}

function gotRemoteStream(evt, event) {
  var objectUrl = URL.createObjectURL(evt.stream);
  CallActionCreators.attachToSrc(objectUrl, event);
}

function gotLocalDescription(description) {
  localPeerConnection.setLocalDescription(description);
  trace('Offer from localPeerConnection: \n', description.sdp);
  remotePeerConnection.setRemoteDescription(description);
  remotePeerConnection.createAnswer(gotRemoteDescription, handleError);
}

function gotRemoteDescription(description) {
  remotePeerConnection.setLocalDescription(description);
  trace('Answer from remotePeerConnection: \n', description.sdp);
  localPeerConnection.setRemoteDescription(description);
}

function gotLocalIceCandidate(event) {
  if (event.candidate) {
    remotePeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
    trace('Local ICE candidate: \n', event.candidate.candidate);
  }
}

function gotRemoteIceCandidate(event) {
  if (event.candidate) {
    localPeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
    trace('Remote ICE candidate: \n', event.candidate.candidate);
  }
}

function handleError() {};

module.exports = WebrtcAPI;
