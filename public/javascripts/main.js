'use strict'

var localVideo = document.querySelector('#localVideo');
var remoteVideo = document.querySelector('#remoteVideo');
var localAudio = document.querySelector('#localAudio');
var remoteAudio = document.querySelector('#remoteAudio');
/* var vgaButton = document.querySelector('#vga'); */
// var qvgaButton = document.querySelector('#qvga');
// var hdButton = document.querySelector('#hd');
/* var fullHdButton = document.querySelector('#full-hd'); */
var audioCallButton = document.querySelector('#audioCall');
var videoCallButton = document.querySelector('#videoCall');
var hangupButton = document.querySelector('#hangup');
var localStream;
var remoteStream;
var localPeerConnection;
var remotePeerConnection;
var isChannelReady;
var isCallStarted = false;
var isInitiator = false;
var isRemoteUserPresent = false;
var hasAudioSupport = false;
var hasVideoSupport = false;

videoCallButton.disabeld = true;
audioCallButton.disabled = true;
hangupButton.disabled = true;
audioCallButton.onclick = audioCall;
videoCallButton.onclick = videoCall;
hangupButton.onclick = hangup;

//start the application
(function init() {
  start();
})();

function start() {
  var successCallback = function(stream) {
    if (stream.getVideoTracks().length > 0) {
      hasVideoSupport = true;
      videoCallButton.disabled = false;
      trace('Using video device: ', stream.getVideoTracks()[0].label);
    };
    if (stream.getAudioTracks().length > 0) {
      hasAudioSupport = true;
      audioCallButton.disabled = false; 
      trace('Using audio device: ', stream.getAudioTracks()[0].label);
    };
  };
  getUserMedia({ audio: true, video: true }, successCallback, errorCallback);
}

function gotAudioStream(stream) {
  trace('Received local audio stream.');
  localAudio.src = URL.createObjectURL(stream);
  localStream = stream;
  audioCallButton.disabled = false;
}

function gotRemoteAudioStream(event) {
  remoteAudio.src = URL.createObjectURL(event.stream);
  trace('Received audio from remote.');
}

function gotStream(event) {
  remoteVideo.src = URL.createObjectURL(event.stream);
}

function gotRemoteStream(event) {
  remoteVideo.src = URL.createObjectURL(event.stream);
  trace('Received video from remote.');
}

function createPeerConnections(type) {
    //Using no signaling process atm
    var servers = null;

    localPeerConnection = new RTCPeerConnection(servers);
    trace('Created local peer connection object.');
    localPeerConnection.onicecandidate = gotLocalIceCandidate;

    remotePeerConnection = new RTCPeerConnection(servers);
    trace('Created remote peer connection objects.');
    remotePeerConnection.onicecandidate = gotRemoteIceCandidate;
    remotePeerConnection = (type === 'audio') ? gotRemoteAudioStream : gotRemoteStream;

    localPeerConnection.addStream(localStream);
    trace('Added localstream to localPeerConnection');
    localPeerConnection.createOffer(gotLocalDescription, handleError);
}

function audioCall() {
  if (hasAudioSupport) {
    navigator.getUserMedia(audioConstraints, gotAudioStream, errorCallback);
    hangupButton.disabled = false;
    createPeerConnections('audio');
  } else {
    console.log('Something went wrong while starting audioCall');
  }
}

function videoCall() {
  if (hasVideoSupport) {
  } else {
    console.log('Something went wrong while starting videoCall');
  }
}

/* vgaButton.onclick = function() { */
  // getMedia(vgaConstraints);
// };

// qvgaButton.onclick = function() {
  // getMedia(qvgaConstraints);
// };

// hdButton.onclick = function() {
  // getMedia(hdConstraints);
// };

// fullHdButton.onclick = function() {
  // getMedia(fullHdConstraints);
/* }; */

var audioConstraints = { audio: true };

var vgaConstraints = {
  video: {
    width: {
      exact: 640
    },
    height: {
      exact: 480
    }
  },
  audio: true
};

var qvgaConstraints = {
  video: {
    width: {
      exact: 320
    },
    height: {
      exact: 240
    }
  },
  audio: true
};

var hdConstraints = {
  video: {
    width: 1280,
    height: 720
  },
  audio: true
};

var fullHdConstraints = {
  video: {
    width: {
      exact: 1920
    },
    height: {
      exact: 1080
    }
  },
  audio: true
};

function getMedia(constraints) {
  if (stream) {
    localVideo.src = null;
    stream.stop();
  }

  setTimeout(function() {
    navigator.getUserMedia(constraints, successCallback, errorCallback);
  });
}

function successCallback(stream) {
  window.localStream = stream;
  attachMediaStream(localVideo, localStream);
}

function errorCallback(error) {
  console.log('getUserMedia is not supported ', error);
}

function trace(text) {
  console.log((performance.now() / 1000).toFixed(3) + ': ' + text);
}

function hangup() {}

// It creates an offer to the remotePeer, where remotePeer generates answer with
// localPeer's description which creates the session for them
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
