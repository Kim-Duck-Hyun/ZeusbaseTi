// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.


// open a single window
var win = Ti.UI.createWindow({
	backgroundColor:'white'
});

var advsegmentedcontrol = require('com.emityme.advsegmcontrol');
var segment = advsegmentedcontrol.createView({
	left:40,
	top:210,
	width:250,
	height:45,
	titles:["Yes", "No", "Maybe"],
});
segment.addEventListener('clickedSegment', function(e) {
	Ti.API.log("selected segment index: ", e.index);	
});

win.add(segment);

win.open();
