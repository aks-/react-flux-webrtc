var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    MAKE_AUDIO_CALL: null,
    MAKE_VIDEO_CALL: null,
    HANG_UP: null
  });
}