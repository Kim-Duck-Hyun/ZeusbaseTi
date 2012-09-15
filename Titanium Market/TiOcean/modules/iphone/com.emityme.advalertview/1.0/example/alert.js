// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.


// open a single window
var win = Ti.UI.currentWindow;
win.backgroundColor = 'transparent';
win.navBarHidden = true;

var advalertview = require('com.emityme.advalertview');
var alert = advalertview.createView();
win.add(alert);