function getUserMediaNotSupportedCallback(error) {
  console.log('getUserMedia is not supported ', error);
}

function trace(text) {
  console.log((performance.now() / 1000).toFixed(3) + ': ' + text);
}

function getMedia(constraints, successCallback) {
  if (typeof successCallback !== 'function') {
    return;
  }
  setTimeout(function() {
    navigator.getUserMedia(constraints, successCallback, function() {
      console.log('Something went wrong in getMedia');
    });
  });
}
