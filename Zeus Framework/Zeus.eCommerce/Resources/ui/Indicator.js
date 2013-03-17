var isIndicatorOpen = false,
	view = Ti.UI.createView({
		backgroundColor : "#000",
		borderRadius    : 10,
		opacity         : 0.8
	}),
	// message
	message = Ti.UI.createLabel({
		color  : "#fff",
		width  : "auto",
		height : "auto",
		font   : { fontSize : 14, fontWeight : "bold" },
		bottom : 20
	}),
	// window container
	indicatorWin = Ti.UI.createWindow({
		top   : 0,
		left  : 0,
		right : 0,
		bottom : 0
	}),
	// loading indicator
	activityIndicator = Ti.UI.createActivityIndicator({
		style  : Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
		height : 30,
		width  : 30
	});

view.add(activityIndicator);
view.add(message);
indicatorWin.add(view);

exports.show = function(settings){
	settings = settings || {};
	isIndicatorOpen = true;
	message.text = settings.txt || "Loading";
	view.width = settings.width || 150;
	view.height = settings.height || 150;
	view.top = settings.top || null;
	view.bottom = settings.bottom || null;
	view.left = settings.left || null;
	view.right = settings.right || null;
	indicatorWin.open();
	activityIndicator.show();
};

exports.hide = function(){
	isIndicatorOpen = false;
	activityIndicator.hide();
	indicatorWin.close({ opacity : 0, duration : 500 });
};

exports.isOpen = function(){
	return isIndicatorOpen;
};
