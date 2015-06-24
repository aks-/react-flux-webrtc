'use strict'

var localStream;
var hasAudioSupport = false;
var hasVideoSupport = false;
var peerConnection = makePeerConnection();
var call = call();

var audioCallButton = document.querySelector('#audioCall');
var videoCallButton = document.querySelector('#videoCall');
var hangupButton = document.querySelector('#hangup');
audioCallButton.onclick = makeAudioCall;
videoCallButton.onclick = makeVideoCall;
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
  getUserMedia({audio: true, video: true}, successCallback, getUserMediaNotSupportedCallback);
}

function makeAudioCall() {
  var audioConstraints = {audio: true};
  makeCall('audio', 'localAudio', 'remoteAudio', audioCallButton, audioConstraints, hasAudioSupport);
}

function makeVideoCall() {
  var videoConstraints = {video: true, audio: true};
  makeCall('video', 'localVideo', 'remoteVideo', videoCallButton, videoConstraints, hasVideoSupport);
}

function makeCall(type, localElementId, remoteElementId, callButton, constraints, hasCallSupport) {
  var localElement = document.querySelector('#'+localElementId);
  var remoteElement = document.querySelector('#'+remoteElementId);
  call.start({type: type,
             trace, trace,
             localStream: localStream,
             localElement: localElement,
             remoteElement: remoteElement,
             callButton: callButton,
             constraints: constraints,
             hasCallSupport: hasCallSupport,
             getMedia: getMedia,
             peerConnection: peerConnection,
             hangupButton: hangupButton,
  });
}

function hangup() {
  call.hang();
}
