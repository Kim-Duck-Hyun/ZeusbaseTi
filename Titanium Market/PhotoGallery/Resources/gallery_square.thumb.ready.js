var win = Titanium.UI.currentWindow;
win.traslucent = true;
win.fullscreen = false;
win.barColor = 'transparent';
win.backgroundColor = '000000';
win.tabGroup.tabBarVisible == true;

//images.js you find an object or a loop for image
Ti.include('images.js');

win.addEventListener('focus',function(e) {
	win.hideNavBar = false;
	win.traslucent = true;
	win.fullscreen = false;
	win.barColor = 'transparent';
	win.backgroundColor = '000000';
	//small hack to show tabGroup
	setTimeout(showTabGroup,300);
});

var showTabGroup = function() {
	tabGroup = win.tabGroup;
	//Ti.API.info(tabGroup.bottom);
 	if (tabGroup.tabBarVisible == false) {
        tabGroup.animate({bottom:0,duration:500});
        tabGroup.tabBarVisible = true;
    }
}

var full = true;
var view = Titanium.UI.createScrollView({
    contentWidth:'auto',
    contentHeight:'auto',
    top:0,
    showVerticalScrollIndicator:true,
    showHorizontalScrollIndicator:true
});


var views = [];
var row = 1;
var pos = 1;
for (var i in images) {
	top = (row-1)*79+48;
	left = (pos-1)*79+4;
	
	img = Titanium.UI.createImageView({
		image: images[i].square,
		width: 75,
		height: 75,
		top: top,
		left: left,
		i: i
	});
	img.addEventListener('singletap',function(e) {
			//Ti.API.info(e);
			var w = Ti.UI.createWindow({
						title:'Galleria',
						backgroundColor: 'fff',
						url: 'galleria.js'
					});
			w.openImage = e.source.i;
			w.fullscreen = false;
			w.traslucent = true;
			w.hideNavBar = false;
			Ti.UI.currentTab.open(w,{animated:true});
	});
	view.add(img);
	
	if(pos==4) {
		row++;
		pos = 1;
	} else {
		pos++;
	}
}
//Ti.API.info(views);

win.add(view);