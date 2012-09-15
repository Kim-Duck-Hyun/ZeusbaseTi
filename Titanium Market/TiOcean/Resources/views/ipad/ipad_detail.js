var win = Ti.UI.currentWindow;

win.title = "Detail";

var advalertview = require('com.emityme.advalertview');
var advappearancetoolkit = require('com.emityme.advappearance');

var buttonAlert = Ti.UI.createButton({
    title:'Alert',
    style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
    backgroundImage:'../../images/ipad-menubar-button.png',
    font:{fontSize:12, fontWeight:'bold'},
    width:50,
    height:30
});

buttonAlert.addEventListener('click', function(e) {
    var alert = advalertview.createView({
        tag:1,
        cancelButton:{title:"Cancel"},
        otherButtons:[{title:"OK", 
                        callback:function(e){
                            Ti.API.log("clicked button tag: " + e.tag);
                        }
                      }]
    });
	alert.addEventListener('close', function(e) {
		Ti.API.log('info','close alert with tag ' + e.tag);
		win.mainWin.remove(alert);
	});
	win.mainWin.add(alert);
});


var popOver_button = Titanium.UI.createButton({
    title: "Popover",
    style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
    backgroundImage:'../../images/ipad-menubar-button.png',
    font:{fontSize:12, fontWeight:'bold'},
    width:70,
    height:30,
    left:10
})

popOver_button.addEventListener('click', function() {

    // appreciate code review by pecdev where he indicated in earlier posting
    // i was creating the pop over every time, i have addressed the issue
    if (win.popover == null) {
        Ti.API.debug("Creating window.popover");
        win.popover = Ti.UI.iPad.createPopover({
            width:320,
            height:480,
            arrowDirection:Ti.UI.iPad.POPOVER_ARROW_DIRECTION_ANY,
            navBarHidden:true,
        });
        // add navigationGroup to popOver
        var navigationGroup = createPopOverNavigationGroup( win.popover );
		advappearancetoolkit.setNavBkgImage(navigationGroup, 'images/ipad-menubar-left.png');
		win.popover.add(navigationGroup);
    } else {
        Ti.API.debug("using existing window.popover");
    }
    Ti.API.log('info',win.popover.children[0]);
	advappearancetoolkit.setNavBkgImage(win.popover.children[0], 'images/ipad-menubar-left.png');	
    advappearancetoolkit.setPopoverBkgClass(win.popover, {width:320, height:480});
    win.popover.show({
        view:popOver_button,
        animated:true
    });

});

var viewRightNav = Ti.UI.createView({
	height:30,
	width:140,
	layout:'horizontal'
});
viewRightNav.add(buttonAlert);
viewRightNav.add(popOver_button);

win.rightNavButton = viewRightNav;

function createPopOverNavigationGroup(popover) {
    var close_button = Ti.UI.createButton({
        title:'Close'
    });
    close_button.addEventListener('click', function() {
        popover.hide({
            animated:true
        });
    });
    var win1 = Titanium.UI.createWindow({
        title: "Countries",
        backgroundColor:'#fff',
        barColor:'black'
    });
    win1.rightNavButton = close_button;

    var tableView = Titanium.UI.createTableView({
        rowHeight: 40,
        barColor:'black'
    });
    win1.add(tableView);
    
    var headerV1 = Ti.UI.createView({
    	backgroundImage:'../../images/popover-table-header.png',
    	height:25,
    	width:'100%'
    });
    var lblHeaderV1 = Ti.UI.createLabel({
    	left:10, width:200, height:20,
    	text:"Countries to visit",
    	font:{fontSize:15, fontWeight:'bold'},
    	color:'gray',
    	shadowColor:'white',
    	shadowOffset:{x:0, y:1}
    });
    headerV1.add(lblHeaderV1);
    var rowTitles1 = ["Iceland", "Greenland", "Switzerland", "Norway", "New Zealand", "Greece", "Rome", "Ireland"];
    var section1 = Ti.UI.createTableViewSection({
    	headerView:headerV1,
    });
    var rows1 = [];
    for (var i=0; i < rowTitles1.length; i++) {
      	var row = Ti.UI.createTableViewRow({
      		title:rowTitles1[i],
      		height:40      		
      	});
      	rows1.push(row);      	
    };
    section1.rows = rows1;
    
    var headerV2 = Ti.UI.createView({
    	backgroundImage:'../../images/popover-table-header.png',
    	height:25,
    	width:'100%'
    });
    var lblHeaderV2 = Ti.UI.createLabel({
    	left:10, width:200, height:20,
    	text:"Countries visited",
    	font:{fontSize:15, fontWeight:'bold'},
    	color:'gray',
    	shadowColor:'white',
    	shadowOffset:{x:0, y:1}
    });
    headerV2.add(lblHeaderV2);
    var rowTitles2 = ["India", "U.S.A"];
    var section2 = Ti.UI.createTableViewSection({
    	headerView:headerV2,
    });
    var rows2 = [];
    for (var i=0; i < rowTitles2.length; i++) {
      	var row = Ti.UI.createTableViewRow({
      		title:rowTitles2[i],
      		height:40      		
      	});
      	rows2.push(row);      	
    };
    section2.rows = rows2;
    tableView.data = [section1, section2];
	
	var searchBar = Ti.UI.createSearchBar({});
	tableView.search = searchBar;
	advappearancetoolkit.setAppearanceSearchBarBkgImage('images/searchbar-bg.png');
	
    // create the navigationGroup
    var navGroup = Ti.UI.iPhone.createNavigationGroup({
        window : win1
    });

    return navGroup;
}


var advswitch = require('com.emityme.advswitch');
var switchOn = advswitch.createView({
	left:300, top:150, width:80, height:36,
	on:true	
});

win.add(switchOn);

var switchOff = advswitch.createView({
	left:390, top:150, width:80, height:36
});

win.add(switchOff);

var advprogressbar = require('com.emityme.advprogressbar');

var progressbar = advprogressbar.createView({
	left:218, top:230, width:327, height:24,
	progress:0.5
});
win.add(progressbar);

var lblLoading = Ti.UI.createLabel({
	left:332, top:250, width:105, height:22,
	text:'Loading...', textAlign:'center',
	color:'gray', font:{fontWeight:'bold'},
	shadowColor:'white', shadowOffset:{x:0, y:1}
});
win.add(lblLoading);

var slider = Titanium.UI.createSlider({
	left:218, top:280, width:327, height:24,
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

var advsegmentedcontrol = require('com.emityme.advsegmcontrol');
var segment = advsegmentedcontrol.createView({
	left:300, top:330, width:150, height:45,
	titles:["Yes", "No"],
});
segment.addEventListener('clickedSegment', function(e) {
	Ti.API.log("selected segment index: ", e.index);	
});

win.add(segment);

var textfield = Ti.UI.createTextField({
	left:223, top:391, width:322, height:41,
	hintText:'Text input',
	backgroundImage:'../../images/ipad-text-input.png',
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
});
win.add(textfield);

var button1 = Ti.UI.createButton({
	left:214, top:456, width:157, height:50,
	title:'Blue Button',
	backgroundImage:'../../images/ipad-button-blue.png',
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	color:'white', shadowColor:'black', shadowOffset:{x:0, y:1},
	font:{fontWeight:'bold', fontSize:18}	
});
win.add(button1);

var button2 = Ti.UI.createButton({
	left:388, top:456, width:157, height:50,
	title:'Blue Button',
	backgroundImage:'../../images/ipad-button-blue-pressed.png',
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	color:'white', shadowColor:'black', shadowOffset:{x:0, y:1},
	font:{fontWeight:'bold', fontSize:18}
});
win.add(button2);

var button3 = Ti.UI.createButton({
	left:214, top:514, width:157, height:50,
	title:'Green Button',
	backgroundImage:'../../images/ipad-button-green.png',
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	color:'white', shadowColor:'black', shadowOffset:{x:0, y:1},
	font:{fontWeight:'bold', fontSize:18}
});
win.add(button3);

var button4 = Ti.UI.createButton({
	left:388, top:514, width:157, height:50,
	title:'Green Button',
	backgroundImage:'../../images/ipad-button-green-pressed.png',
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	color:'white', shadowColor:'black', shadowOffset:{x:0, y:1},
	font:{fontWeight:'bold', fontSize:18}
});
win.add(button4);

var button5 = Ti.UI.createButton({
	left:214, top:569, width:157, height:50,
	title:'Red Button',
	backgroundImage:'../../images/ipad-button-red.png',
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	color:'white', shadowColor:'black', shadowOffset:{x:0, y:1},
	font:{fontWeight:'bold', fontSize:18}
});
win.add(button5);

var button6 = Ti.UI.createButton({
	left:388, top:569, width:157, height:50,
	title:'Red Button',
	backgroundImage:'../../images/ipad-button-red-pressed.png',
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	color:'white', shadowColor:'black', shadowOffset:{x:0, y:1},
	font:{fontWeight:'bold', fontSize:18}
});
win.add(button6);

var button7 = Ti.UI.createButton({
	left:214, top:627, width:157, height:50,
	title:'Gray Button',
	backgroundImage:'../../images/ipad-button-grey.png',
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	color:'gray', shadowColor:'white', shadowOffset:{x:0, y:1},
	font:{fontWeight:'bold', fontSize:18}
});
win.add(button7);

var button8 = Ti.UI.createButton({
	left:388, top:627, width:157, height:50,
	title:'Gray Button',
	backgroundImage:'../../images/ipad-button-grey-pressed.png',
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	color:'gray', shadowColor:'white', shadowOffset:{x:0, y:1},
	font:{fontWeight:'bold', fontSize:18}
});
win.add(button8);







