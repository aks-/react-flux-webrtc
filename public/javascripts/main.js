'use strict'

var localVideo = document.querySelector('#localVideo');
var remoteVideo = document.querySelector('#remoteVideo');
var localAudio = document.querySelector('#localAudio');
var remoteAudio = document.querySelector('#remoteAudio');
var audioCallButton = document.querySelector('#audioCall');
var videoCallButton = document.querySelector('#videoCall');
var hangupButton = document.querySelector('#hangup');
var videosDiv = document.querySelector('#videos');
var localStream;
var remoteStream;
var localPeerConnection;
var remotePeerConnection;
var isChannelReady;
var isAudioCall;
var isVideoCall;
var isCallStarted = false;
var isInitiator = false;
var isRemoteUserPresent = false;
var hasAudioSupport = false;
var hasVideoSupport = false;
var audioConstraints = {audio: true};

videoCallButton.disabled = true;
audioCallButton.disabled = true;
hangupButton.disabled = true;
videosDiv.style.display = 'none'
audioCallButton.onclick = audioCall;
videoCallButton.onclick = videoCall;
hangupButton.onclick = hangup;

//start the application
start();

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
  getUserMedia({audio: true, video: true}, successCallback, errorCallback);
}

function audioCall() {
  cleanPriorVideoCallIfAny();
  if (hasAudioSupport) {
    isAudioCall = true;
    getMedia(audioConstraints, gotAudioStream);
    setTimeout(function() {
      createPeerConnection();
    }, 3000);
  } else {
    console.log('Something went wrong while starting audioCall');
  }
}

function videoCall() {
  cleanPriorAudioCallIfAny();
  if (hasVideoSupport) {
    isVideoCall = true;
    videosDiv.style.display = 'block';
    getMedia({audio: true, video: true}, gotVideoStream);
    setTimeout(function() {
      createPeerConnection();
    }, 3000);
  } else {
    console.log('Something went wrong while starting videoCall');
  }
}

function hangup() {
  trace('Hanging up.');
  localPeerConnection.close();
  remotePeerConnection.close();
  localPeerConnection = null;
  remotePeerConnection = null;
  hangupButton.disabled = true;
  audioCallButton.disabled = false;
  videoCallButton.disabled = false;
  localAudio.src = '';
  remoteAudio.src = '';
  localVideo.src = '';
  remoteVideo.src = '';
  videosDiv.style.display = 'none';
}

function createPeerConnection() {
  if (isAudioCall) {
    createPeerConnection('audio');
  } else {
    createPeerConnection('video');
  }
}

function createPeerConnection(type) {
    //Using no signaling process atm
    var servers = null;

    localPeerConnection = new RTCPeerConnection(servers);
    trace('Created local peer connection object.');
    localPeerConnection.onicecandidate = gotLocalIceCandidate;

    remotePeerConnection = new RTCPeerConnection(servers);
    trace('Created remote peer connection objects.');
    remotePeerConnection.onicecandidate = gotRemoteIceCandidate;
    remotePeerConnection.onaddstream = (type === 'audio') ? gotRemoteAudioStream : gotRemoteVideoStream;

    localPeerConnection.addStream(localStream);
    trace('Added localstream to localPeerConnection');
    localPeerConnection.createOffer(gotLocalDescription, handleError);
}

function cleanPriorAudioCallIfAny() {
  if (localStream && localAudio.src !== '') {
    localStream = null;
    localAudio.src = '';
    remoteAudio.src = '';
  }
}

function cleanPriorVideoCallIfAny() {
  if (localStream && localVideo.src !== '') {
    localStream = null;
    localVideo.src = '';
    remoteVideo.src = '';
  }
}

function gotAudioStream(stream) {
  trace('Received local audio stream.');
  localStream = stream;
  attachMediaStream(localAudio, localStream);
  audioCallButton.disabled = true;
  hangupButton.disabled = false;
}

function gotVideoStream(stream) {
  localStream = stream;
  attachMediaStream(localVideo, localStream);
  videoCallButton.disabled = true;
  hangupButton.disabled = false;
}

function gotRemoteAudioStream(event) {
  remoteStream = event.stream;
  attachMediaStream(remoteAudio, remoteStream);
  trace('Received audio from remote.');
}

function gotRemoteVideoStream(event) {
  remoteStream = event.stream;
  attachMediaStream(remoteVideo, remoteStream);
  trace('Received video from remote.');
}

function getMedia(constraints, successCallback) {
  if (typeof successCallback !== 'function') {
    return;
  }

  if (localStream) {
    if (isAudioCall) {
      localAudio.src = null;
    }
    if (isVideoCall) {
      localVideo.src = null;
    }
    localStream.stop();
    if (remoteStream) {
      remoteStream.stop();
    }
  }

  setTimeout(function() {
    navigator.getUserMedia(constraints, successCallback, errorCallback);
  });
}

function errorCallback(error) {
  console.log('getUserMedia is not supported ', error);
}

function trace(text) {
  console.log((performance.now() / 1000).toFixed(3) + ': ' + text);
}

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
