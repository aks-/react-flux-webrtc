var WebrtcAppDispatcher = require('../dispatcher/WebrtcAppDispatcher');
var WebrtcAppConstants = require('../dispatcher/WebrtcAppConstants');

var ActionTypes = WebrtcAppConstants.ActionTypes;

module.exports = {
  makeAudioCall: function() {
    //make call and use promises
    WebrtcAppDispatcher.dispatch({
      type: ActionTypes.MAKE_AUDIO_CALL
    });
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
