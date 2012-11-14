var win = Titanium.UI.currentWindow;
win.traslucent = true;
win.fullscreen = false;
win.barColor = 'transparent';
win.backgroundColor = '000000';

//images.js you find an object or a loop for image
Ti.include('images.js');

win.addEventListener('focus',function(e) {
	//win.hideNavBar = false;
	win.traslucent = true;
	win.fullscreen = false;
	win.barColor = 'transparent';
	win.backgroundColor = '000000';
});

win.tabGroup.tabBarVisible = true;
var buttTabBar = Titanium.UI.createButton({
   title: (win.tabGroup.tabBarVisible == true)?'Hide TabBar':'Show TabBar',
   backgroundColor: '000000'
});
buttTabBar.addEventListener('click',function(e)
{
	var tabGroup = win.tabGroup;
    if (tabGroup.tabBarVisible == true) {
    	buttTabBar.title = 'Show TabBar';
        tabGroup.animate({bottom:-50,duration:500});
        tabGroup.tabBarVisible = false;
    } else {
    	buttTabBar.title = 'Hide TabBar';
        tabGroup.animate({bottom:0,duration:500});
        tabGroup.tabBarVisible = true;
    }
    buttUpdate();
});
win.setRightNavButton(buttTabBar);

//win.hideNavBar({animate: false});
var full = false;

function getOrientation(orientation) {
	if(orientation == Ti.UI.PORTRAIT || orientation == Ti.UI.UPSIDE_PORTRAIT){
		//vert
		noteBottom = 0;
		if (noteView) {
   	     if(full==false) {noteView.animate({bottom: noteBottom,duration:500});}
   	     buttUpdate();
   		}
		return 'vert';
	} else if(orientation == Ti.UI.LANDSCAPE_LEFT || orientation == Ti.UI.LANDSCAPE_RIGHT){
	  //oriz
		noteBottom = 0;
		if (noteView) {
        	if(full==false) {noteView.animate({bottom: noteBottom,duration:500});}
        	buttUpdate();
    	}
		return 'oriz';
	}
}

getOrientation(Ti.UI.orientation);

	win.orientationModes = [
		Titanium.UI.PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
	];

//
// orientation change listener
//
Ti.Gesture.addEventListener('orientationchange',function(e)
{
	// get orienation from event object
	var orientation = getOrientation(e.orientation);
	//Titanium.API.info(orientation);
});


var views = [];
for (var i in images) {
	image = Titanium.UI.createImageView({
		image: images[i].image,
		note: images[i].note
	});
	if(images[i].hires==true) {
		image.hires = true;
	}
	views.push(image);
}
//Ti.API.info(images.length);

var scrollView = Titanium.UI.createScrollableView({
	//views:[view1,view2,view3,view4],
	views: views,
	showPagingControl:false,
	pagingControlHeight:10,
	maxZoomScale:2.0,
	currentPage:0
});

win.add(scrollView);

i=0;
var activeView = views[0];

scrollView.addEventListener('scroll', function(e)
{
  activeView = e.view;  // the object handle to the view that is about to become visible
	buttHideShow();
	updateNote();
});


var tabGroup = win.tabGroup;
var navBar = win.navBar;

var noteView = Ti.UI.createView({
								height: 'auto',
								backgroundImage: 'images/bg-traslucent.png',
								bottom: noteBottom
							});
var noteLabel = Ti.UI.createLabel({
					top: 5,
					right: 5,
					bottom: 5,
					left: 5,
					height: 'auto',
					backgroundColor: 'transparent',
					font: {fontSize:12},
					text: activeView.note,
					color: 'fff'
					});
noteView.add(noteLabel);
win.add(noteView);

var buttPrev = Ti.UI.createImageView({
	image: 'images/prev-arrows.png',
	width: 32,
	height: 72,
	top: 150,
	left: 0,
	zIndex: 10
})
win.add(buttPrev);
buttPrev.hide();

var buttNext = Ti.UI.createImageView({
	image: 'images/next-arrows.png',
	width: 32,
	height: 72,
	top: 150,
	right: 0,
	zIndex: 10
})
win.add(buttNext);

var flexSpace = Titanium.UI.createButton({
	systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
var next = Titanium.UI.createButton({
	backgroundImage:'images/icons/circle-east.png',
	//backgroundSelectedImage:'../images/send_selected.png',
	width:28,
	height:28
});
var prev = Titanium.UI.createButton({
	backgroundImage:'images/icons/circle-west.png',
	//backgroundSelectedImage:'../images/send_selected.png',
	width:28,
	height:28
});


function buttHideShow() {
	i = scrollView.currentPage;
	if(i==0) buttPrev.hide();
	else buttPrev.show();

	if(i==(images.length-1)) buttNext.hide();
	else buttNext.show();
}
function buttUpdate(){
	var h = Ti.UI.currentWindow.height;
	var top = parseInt((h-72)/2);
	buttPrev.animate({top: top,duration: 500});
	buttNext.animate({top: top,duration: 500});	
}

function updateNote() {
	noteLabel.text = activeView.note;
}

buttNext.addEventListener('click',function(e){
    if(scrollView.currentPage != (images.length - 1))
    {
        var num = Number(scrollView.currentPage += 1);
        scrollView.scrollToView(num);
        activeView = views[num];
    }
    buttHideShow();
    updateNote();
});


buttPrev.addEventListener('click',function(e){
    if(scrollView.currentPage != 0)
    {
        var num = Number(scrollView.currentPage -= 1);
        activeView = views[num];
        scrollView.scrollToView(num);
    }
    buttHideShow();
    updateNote();
});

scrollView.addEventListener('dblclick',function(e){ 
    if (full == false) {
        win.hideNavBar();
        noteView.animate({bottom:-60,duration:500});
        full = true;
    } else {
        win.showNavBar();
        noteView.animate({bottom: noteBottom,duration:500});
        full = false;
    }
});


//setto l'immagine da aprire
if(win.openImage) {
		var num = Number(scrollView.currentPage -= 1);
		activeView = views[win.openImage];
		scrollView.scrollToView(win.openImage);
		buttHideShow();
		updateNote();
}
