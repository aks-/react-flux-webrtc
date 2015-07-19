var WebrtcAppDispatcher = require('../dispatcher/WebrtcAppDispatcher');
var WebrtcAppConstants = require('../dispatcher/WebrtcAppConstants');

var ActionTypes = WebrtcAppConstants.ActionTypes;

module.exports = {
  makeAudioCall: function() {
    WebrtcAppDispatcher.dispatch({
      type: ActionTypes.MAKE_AUDIO_CALL
    });
    //Do db related stuff here
  },
  makeVideoCall: function() {
     WebrtcAppDispatcher.dispatch({
      type: ActionTypes.MAKE_VIDEO_CALL
    });
  },
  hangCall: function() {
    WebrtcAppDispatcher.dispatch({
      type: ActionTypes.HANG_UP
    });
  }
}
