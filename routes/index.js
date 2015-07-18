var express = require('express');
var router = express.Router();
var React = require('react');
var WebrtcApp = React.createFactory(require('../build/javascripts/components/WebrtcApp.react.min'));

/* GET home page. */
router.get('/', function(req, res, next) {
  var webrtcHtml = React.renderToString(WebrtcApp({}));
  res.render('index', { title: 'Express', webrtcHtml: webrtcHtml });
});

module.exports = router;
