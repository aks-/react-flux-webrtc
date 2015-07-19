var bluebird = require('bluebird');
var WebrtcAppDispatcher = require('../dispatcher/WebrtcAppDispatcher');
var videoSupport = false;
var AudioSupport = false;
var serverConfig = null;
var localPeerConnection, remotePeerConnection;

var WebrtcAPI = {
  start: function() { 
    var constraints = {audio: true, video: true};
    bluebird.promisify(getUserMedia(constraints))
    .then(function(stream) {
      setAudioVideoSupport(stream);
    })
    .fail(function() {
      //TODO create error-message component and change starte using dispatcher
    });
  },
  audioCall: function() {
    bluebird.promisify(getUserMedia(constraints))
    .then(function(stream) {
      setAudioVideoSupport(stream);
      return stream;
    })
    .then(function(stream) {
      console.log('Received local stream');
      localStream = stream;
      return localStream;
    })
    .then(function(stream) {
      var objectUrl = URL.createObjectURL(stream);
      //TODO dispatch it to components to change the view
      return stream;
    })
    .then(function(stream) {
      localPeerConnection = new RTCPeerConnection(serverConfig);
      localPeerConnection.onicecandidate = gotLocalIceCandidate;
      remotePeerConnection = new RTCPeerConnection(serverConfig);
      remotePeerConnection.onicecandidate = gotRemoteIceCandidate;
      remotePeerConnection.onaddstream = gotRemoteStream;
      localPeerConnection.addStream(stream);
      localPeerConnection.createOffer(gotLocalDescription, handleError);
    })
    .fail(function() {
      //TODO create error-message component and change starte using dispatcher
    });

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
  },
  makeAudioCall: function() {
    var audioConstraints = {audio: true};
    peerConnection.init({localStream: localStream, gotStream: gotRemoteStream});
    makeCall('audio', 'localAudio', 'remoteAudio', audioCallButton, audioConstraints, hasAudioSupport);
  },
  makeVideoCall: function() {
    var videoConstraints = {video: true, audio: true};
    makeCall('video', 'localVideo', 'remoteVideo', videoCallButton, videoConstraints, hasVideoSupport);
  },
  hangup: function() {
    call.hang();
  }
};

function setAudioVideoSupport(stream) {
  if (stream.getVideoTracks().length > 0) {
    videoSupport = true;
    console.log('Using video device: ', stream.getVideoTracks()[0].label);
  }
  if (stream.getAudioTracks().length > 0) {
    audioSupport = true;
    console.log('Using video device: ', stream.getAudioTracks()[0].label);
  }
}

module.exports = WebrtcAPI;
