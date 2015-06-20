'use strict'

var video = document.querySelector('video');
var stream;

var vgaButton = document.querySelector('#vga');
var qvgaButton = document.querySelector('#qvga');
var hdButton = document.querySelector('#hd');
var fullHdButton = document.querySelector('#full-hd');

vgaButton.onclick = function() {
  getMedia(vgaConstraints);
};

qvgaButton.onclick = function() {
  getMedia(qvgaConstraints);
};

hdButton.onclick = function() {
  getMedia(hdConstraints);
};

fullHdButton.onclick = function() {
  getMedia(fullHdConstraints);
};

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

function successCallback(stream) {
  window.stream = stream;
  attachMediaStream(video, stream);
}

function errorCallback(error) {
  console.log('getUserMedia error ' + error);
}

function getMedia(constraints) {
  if (stream) {
    video.src = null;
    stream.stop();
  }

  setTimeout(function() {
    navigator.getUserMedia(constraints, successCallback, errorCallback);
  }, (stream ? 200 : 0));
}
