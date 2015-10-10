var WebrtcAppDispatcher = require('../dispatcher/WebrtcAppDispatcher');
var WebrtcAppConstants = require('../constants/WebrtcAppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = WebrtcAppConstants.ActionTypes;
var CHANGE_EVT = 'change';

var _callMode = null,
  _localAudioSrc = null,
  _localAudioMuted = null,
  _localVideoSrc = null,
  _localVideoMuted = null,
  _remoteAudioSrc = null,
  _remoteAudioMuted = null,
  _remoteVideoSrc = null,
  _remoteVideoMuted = null;

function getControlsState() {
  return {type: _callMode};
}

function getLocalAudio() {
  return {
    audio: {
      src: _localAudioSrc,
      muted: _localAudioMuted
    }
  };
}

function getLocalVideo() {
  return {
    video: {
      src: _localVideoSrc,
      muted: _localVideoMuted
    }
  };
}

function getRemoteVideo() {
  return {
    video: {
      src: _remoteVideoSrc,
      muted: _remoteVideoMuted
    }
  };
}

function getRemoteVideo() {
  return {
    video: {
      src: _remoteVideoSrc,
      muted: _remoteVideoMuted
    }
  };
}

var CallStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVT);
  },
  addChangeListener: function() {
    this.on(CHANGE_EVT, callback);
  },
  removeChangeListener: function() {
    this.on(CHANGE_EVT, callback);
  },
  setLocalAudioSource: function(src) {
    _localAudioSrc = src;
    _localAudioMuted = true;
  },
  setLocalVideoSource: function(src) {
    _localVideoSrc = src;
    _localVideoMuted = false;
  },
  setRemoteAudioSource: function(src) {
    _remoteAudioSrc = src;
    _remoteAudioMuted = false;
  },
  setRemoteVideoSource: function(src) {
    _remoteVideoSrc = src;
    _remoteVideoMuted = false;
  }
});

CallStore.dispatchToken = WebrtcAppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.MAKE_AUDIO_CALL:
      _callMode = 'audio';
      CallStore.emitChange();
      break;
    case ActionTypes.MAKE_VIDEO_CALL:
      _callMode = 'video';
      CallStore.emitChange();
      break;
    case ActionTypes.HANG_UP:
      _callMode = null;
      CallStore.emitChange();
      break;
    case ActionTypes.ATTACH_LOCAL_AUDIO_SOURCE:
      CallStore.setLocalAudioSource(action.url); 
      CallStore.emitChange();
      break;
    case ActionTypes.ATTACH_LOCAL_VIDEO_SOURCE:
      CallStore.setLocalVideoSource(action.url); 
      CallStore.emitChange();
      break;
    case ActionTypes.ATTACH_REMOTE_AUDIO_SOURCE:
      CallStore.setRemoteAudioSource(action.url);
      CallStore.emitChange();
      break;
    case ActionTypes.ATTACH_REMOTE_VIDEO_SOURCE:
      CallStore.setRemoteVideoSource(action.url);
      CallStore.emitChange();
      break;
  }
});

module.exports = CallStore;
