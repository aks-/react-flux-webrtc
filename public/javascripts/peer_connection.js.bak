var makePeerConnection = function() {
  var trace, localPeerConnection, remotePeerConnection;

  function createConnection(servers, gotStream, localStream) {
    //Using no signaling process atm
    localPeerConnection = new RTCPeerConnection(servers);
    trace('Created local peer connection object.');
    localPeerConnection.onicecandidate = gotLocalIceCandidate;

    remotePeerConnection = new RTCPeerConnection(servers);
    trace('Created remote peer connection objects.');
    remotePeerConnection.onicecandidate = gotRemoteIceCandidate;
    remotePeerConnection.onaddstream = gotStream;

    localPeerConnection.addStream(localStream);
    trace('Added localstream to localPeerConnection');
    localPeerConnection.createOffer(gotLocalDescription, handleError);
  }

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

  return {
    //args needs to have properties localStream, gotStream, trace(optional), servers(optional)
    init: function(args) {
      var servers, localStream, gotStream;
      if (args.localStream == undefined) {
        return "localStream is not defined";
      }
      if (args.gotStream == undefined) {
        return "gotStream is not defined";
      }
      trace = args.trace || function(message) {
        console.log(message);
      };
      servers = args.servers || null;
      localStream = args.localStream;
      gotStream = args.gotStream;
      try {
        createConnection(servers, gotStream, localStream);
      } catch(e) {
        //Show an error page with message
        document.querySelector("#error-message").innerHtml = "Aww! Something went wrong while making connection to your remote buddy. :("
      }
    },

    close: function() {
      try {
        localPeerConnection.close();
        remotePeerConnection.close();
      } catch(e) {
        document.querySelector("#error-message").innerHtml = "Aww! Something went wrong while making connection to your remote buddy. :("
      }
      localPeerConnection = null;
      remotePeerConnection = null;
    }
  }
};
