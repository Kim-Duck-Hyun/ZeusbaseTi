var win = Ti.UI.currentWindow;
win.title = "Elements";

var advprogressbar = require('com.emityme.advprogressbar');
var progressbar = advprogressbar.createView({
	left:10, top:40, width:300, height:24,
	progress:0.5
});
win.add(progressbar);

var lblLoading = Ti.UI.createLabel({
	left:108, top:70, width:105, height:22,
	text:'Loading...', textAlign:'center',
	color:'gray', font:{fontWeight:'bold'},
	shadowColor:'white', shadowOffset:{x:0, y:1}
});
win.add(lblLoading);

var slider = Titanium.UI.createSlider({
	left:10, top:100, width:300, height:24,
	min:0, max:1, value:0.5,
	leftTrackImage:'../../images/ipad-slider-fill.png',
	rightTrackImage:'../../images/ipad-slider-track.png',
	thumbImage:'../../images/ipad-slider-handle.png',
	highlightedThumbImage:'../../images/ipad-slider-handle.png'
});
slider.addEventListener('change', function(e) {
	progressbar.progress = slider.value;
});
win.add(slider);

var advswitch = require('com.emityme.advswitch');
var switchOn = advswitch.createView({
	left:70, top:150, width:80, height:36,
	on:true	
});
win.add(switchOn);

var switchOff = advswitch.createView({
	left:180, top:150, width:80, height:36
});
win.add(switchOff);

var advsegmentedcontrol = require('com.emityme.advsegmcontrol');
var segment = advsegmentedcontrol.createView({
	left:90, top:210, width:150, height:45,
	titles:["Yes", "No"],
});
segment.addEventListener('clickedSegment', function(e) {
	Ti.API.log("selected segment index: ", e.index);	
});
win.add(segment);

var textfield = Ti.UI.createTextField({
	left:10, top:288, width:300, height:37,
	hintText:'Text input',
	backgroundImage:'../../images/ipad-text-input.png',
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
});
win.add(textfield);






