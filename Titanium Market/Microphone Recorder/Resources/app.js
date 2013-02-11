Titanium.include("functions.js");

var my_sound = null;
var matrixRotation = null;
var timer = null;
var recordTimer = null;
var matrix = null;
var meter = null;
var win = Titanium.UI.createWindow({
	backgroundImage: "img/bg-record.png"
});
var vuMeterDuration = 100;
var recordedSound = null;
var player = null;

function showLevels()
{
	var angle = Math.round((105 * Ti.Media.averageMicrophonePower) - 60);
	matrix = Titanium.UI.create2DMatrix();
	matrix = matrix.rotate(angle);
	meter.animate({transform: matrix, duration: vuMeterDuration});
}

var panel = Ti.UI.createView({
	backgroundImage: "img/bg-panel.png",
	top: 90,
	left: 30,
	width: 263,
	height: 216
});
var glassRed = Ti.UI.createImageView({
	image: "img/glass-red.png",
	top: 15,
	left: 15,
	width: 234,
	height: 133
});
var glassBlue = Ti.UI.createImageView({
	image: "img/glass-blue.png",
	top: 15,
	left: 15,
	width: 234,
	height: 133
});
var glassGreen = Ti.UI.createImageView({
	image: "img/glass-green.png",
	top: 15,
	left: 15,
	width: 234,
	height: 133,
	opacity: 0
});
meter = Ti.UI.createImageView({
	image: "img/meter.png",
	bottom: 70,
	left: 130,
	width: 8,
	height: 111,
	anchorPoint: {x: 0.5 , y: 1}
});
var panelLogo = Ti.UI.createImageView({
	image: "img/logo-small.png",
	top: 125,
	left: 107,
	width: 48,
	height: 35
});
var recorder = Titanium.Media.createAudioRecorder({});
recorder.compression = Ti.Media.AUDIO_FORMAT_AAC;
recorder.format = Ti.Media.AUDIO_FILEFORMAT_CAF;
var btnRecord = Titanium.UI.createButton({
	backgroundImage: "img/btn-record.png",
	backgroundSelectedImage: "img/btn-record-selected.png",
	width: 236,
	height: 37,
	bottom: 15,
	left: 15,
	visible: true
});
var progressHolder = Ti.UI.createView({
	backgroundColor: "#333333",
	bottom: 15,
	left: 15,
	width: 236,
	height: 39,
	visible: false
});
var progressMeter = Ti.UI.createView({
	backgroundImage: "img/bg-progress.png",
	top: 0,
	left: 0,
	width: 136,
	height: 39
});
var progressHelper = Ti.UI.createView({
	backgroundImage: "img/bg-progressbar.png",
	top: 0,
	left: 0,
	width: 236,
	height: 39
});
var progressTime = Ti.UI.createLabel({
	text: "05:00",
	top: 10,
	left: 10,
	width: 100,
	height: 19,
	color: "#ffffff",
	font: {
		fontFamily: "Helvetica Neue",
		fontWeight: "bold",
		fontSize: 17,
	}
});
var btnRe = Ti.UI.createButton({
	backgroundImage: "img/btn-re.png",
	backgroundSelectedImage: "img/btn-re-selected.png",
	width: 63,
	height: 40,
	bottom: 15,
	visible: false,
	left: 15
});
var btnReplay = Ti.UI.createButton({
	backgroundImage: "img/btn-replay.png",
	backgroundSelectedImage: "img/btn-replay-selected.png",
	width: 63,
	height: 40,
	bottom: 15,
	visible: false,
	left: 83
});
panel.add(glassRed);
panel.add(glassBlue);
panel.add(glassGreen);
panel.add(meter);
panel.add(panelLogo);
panel.add(btnRecord);
panel.add(btnRe);
panel.add(btnReplay);
progressHolder.add(progressMeter);
progressHolder.add(progressHelper);
progressHolder.add(progressTime);
panel.add(progressHolder);
win.add(panel);

win.addEventListener('focus', function(){
	//start monitoring the mic
	Ti.Media.startMicrophoneMonitor();
	timer = setInterval(showLevels, 50);
	if (matrixRotation == null)
	{
		matrix = Titanium.UI.create2DMatrix();
		matrix = matrix.rotate(-60);
		matrixRotation = -60;
		meter.animate({transform: matrix, duration: 1});
	}
});
win.addEventListener('blur', function() {
	clearInterval(timer);
	info("Timer interval cleared");
});
btnRecord.addEventListener('click', function() {
	Titanium.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_RECORD;
	recorder.start();
	btnRecord.visible = false;
	progressHolder.visible = true;
	progressMeter.width = 236;
	//glass changing
	var animation = Titanium.UI.createAnimation();
	animation.opacity = 0;
	animation.duration = 500;
	glassBlue.animate(animation);
	//start timer
	var recordTime = 5000;
	recordTimer = setInterval(function(){
		if (recordTime > 0)
		{
			recordTime -= 10;
			progressTime.text = niceTime(recordTime);
			progressMeter.width = Math.round(236 * recordTime / 5000);
		}
		else
		{
			//recording is over
			clearInterval(recordTimer);
			recordedSound = recorder.stop();
			progressMeter.width = 236;
			progressHolder.visible = false;
			var animation = Titanium.UI.createAnimation();
			animation.opacity = 1;
			animation.duration = 500;
			glassBlue.animate(animation);
			//show further options
			btnRe.visible = true;
			btnReplay.visible = true;
			//save file, overwrite if necessary
			var nowTS = new Date();
			var f = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, nowTS.getTime() + '.caf');
			if (f.exists()) 
			{
				f.deleteFile();
			}
			f.write(recordedSound.toBlob());
			//prepare/load sound
			player = Ti.Media.createSound({url: Titanium.Filesystem.applicationDataDirectory + nowTS.getTime() + ".caf", preload: true, volume: 1});
		}
	}, 10);
});
btnRe.addEventListener('click', function() {
	btnRe.visible = false;
	btnReplay.visible = false;
	btnRecord.visible = true;
});
btnReplay.addEventListener('click', function() {
	var animation = Titanium.UI.createAnimation();
	animation.opacity = 1;
	animation.duration = 500;
	glassGreen.animate(animation);
	Titanium.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;
	btnReplay.backgroundImage = "img/btn-replay-on.png";
	player.addEventListener('complete', function() {
		btnReplay.backgroundImage = "img/btn-replay.png";
		var animation = Titanium.UI.createAnimation();
		animation.opacity = 0;
		animation.duration = 500;
		glassGreen.animate(animation);
		Titanium.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_RECORD;
	});
	player.play();
});
win.open();