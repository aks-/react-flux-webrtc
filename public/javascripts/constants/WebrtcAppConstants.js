var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    MAKE_AUDIO_CALL: null,
    MAKE_VIDEO_CALL: null,
    HANG_UP: null,
    AFTER_CALL_HANGED: null,
    ATTACH_AUDIO_SOURCE: null,
    ATTACH_VIDEO_SOURCE: null
  });
}
