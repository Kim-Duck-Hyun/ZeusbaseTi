// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.


// open a single window
var win = Ti.UI.createWindow({
	backgroundColor:'white'
});

// TODO: write your module tests here
var advprogressbar = require('com.emityme.advprogressbar');

var progressbar = advprogressbar.createView({
	left:10,
	top:30,
	width:300,
	height:24,
	progress:0.7
});
win.add(progressbar);

var slider = Titanium.UI.createSlider({
	left:10,
	top:60,
	width:300,
	height:24,
	min:0,
	max:1,
	value:0.5
});
slider.addEventListener('change', function(e) {
	progressbar.progress = slider.value;
	//Ti.API.log("Slider value: " + slider.value);
});
win.add(slider);

win.open();


