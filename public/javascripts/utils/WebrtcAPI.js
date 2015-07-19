var bluebird = require('bluebird');
var WebrtcAppDispatcher = require('../dispatcher/WebrtcAppDispatcher');
var serverConfig = null;
var localPeerConnection, remotePeerConnection;

var WebrtcAPI = {
  makeAudioCall: function() {
    var constraints = {audio: true};
    this._call(constraints, MAKE_AUDIO_CALL);
  },
  makeVideoCall: function() {
    var constraints = {video: true, audio: true};
    this._call(constraints, MAKE_VIDEO_CALL);
  },
  hangup: function() {
    call.hang();
  },
  _call: function(constraints, event) {
    bluebird.promisify(getUserMedia(constraints))
    .then(gotStream)
    .then(function(stream) {
      var objectUrl = URL.createObjectURL(stream);
      //TODO dispatch it to components to change the view
      return stream;
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

function createConnection(stream) {
  localPeerConnection = new RTCPeerConnection(serverConfig);
  localPeerConnection.onicecandidate = gotLocalIceCandidate;
  remotePeerConnection = new RTCPeerConnection(serverConfig);
  remotePeerConnection.onicecandidate = gotRemoteIceCandidate;
  remotePeerConnection.onaddstream = gotRemoteStream;
  localPeerConnection.addStream(stream);
  localPeerConnection.createOffer(gotLocalDescription, handleError);
}

function gotRemoteStream(evt) {
  var objectUrl = URL.createObjectURL(evt.stream);
  //TODO dispatch it to component of remote video
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

function setAudioVideoSupport(stream) {
  if (stream.getVideoTracks().length > 0) {
    videoSupport = true;
    console.log('Using video device: ', stream.getVideoTracks()[0].label);
  }
  if (stream.getAudioTracks().length > 0) {
    audioSupport = true;
    console.log('Using video device: ', stream.getAudioTracks()[0].label);
  }
  return stream;
}

module.exports = WebrtcAPI;
