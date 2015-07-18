var call = function() {
  var trace,
  localStream,
  remoteStream,
  localElement,
  remoteElement,
  callButton,
  hasCallSupport,
  getMedia,
  peerConnection,
  hangupButton,
  callConstraints,
  //Tell remote that we would like to receive video and audio
  remoteRequestConstraints = {
    'mandatory': {
      'OfferToReceiveAudio': true,
      'OfferToReceiveVideo': true
    }
  };
  var videosDiv = document.querySelector('#videos');

  function call() {
    cleanPriorCallDetailsIfAny();
    if (hasCallSupport) {
      if (type === 'video') {
        videosDiv.style.display = 'block';
      }
      getMedia(callConstraints, getStream);
      setTimeout(function() {
        peerConnection.init({localStream: localStream, gotStream: gotRemoteStream});
      }, 3000);
    } else {
      console.log('Something went wrong while starting call');
    }
  }

  function cleanPriorCallDetailsIfAny() {
    if (localStream && localElement.src != '') {
      localStream = null;
      localElement.src = '';
      remoteElement.src = '';
    }
  }

  function getStream(stream) {
    trace('Received local stream');
    localStream = stream;
    attachMediaStream(localElement, localStream);
    callButton.disabled = true;
    hangupButton.disabled = false;
  }

  function gotRemoteStream(event) {
    remoteStream = event.stream;
    attachMediaStream(remoteElement, remoteStream);
    trace('Received audio from remote');
  }

  return {
    //start audio or video call
    start: function(args) {
      type = args.type;
      trace = args.trace || function(message) {
        console.log(message);
      }
      localStream = args.localStream;
      localElement = args.localElement;
      remoteElement = args.remoteElement;
      callButton = args.callButton;
      hangupButton = args.hangupButton;
      hasCallSupport = args.hasCallSupport;
      getMedia = args.getMedia;
      peerConnection = args.peerConnection;
      callConstraints = args.constraints;
      try {
        call();
      } catch(e)  {
        document.querySelector("#error-message").innerHtml = "Aww! Something went wrong while making call. :("
      }
    },

    hang: function(connection) {
      trace('Hanging up!');
      try {
        peerConnection.close();
      } catch(e) {
        //send this message to server logs as well
        console.log('Something went wrong while hanging call');
      }
      hangupButton.disabled = true;
      callButton.disabled = false;
      localElement.src = '';
      remoteElement.src = '';
      videosDiv.style.display = 'none';
      shouldClosePeerConnection = true;
    }
  }
}
