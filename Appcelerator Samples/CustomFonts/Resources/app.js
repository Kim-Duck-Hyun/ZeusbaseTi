// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


/*
	Branching logic based on OS
*/
var osname = Ti.Platform.osname;
var os = function(/*Object*/ map) {
	var def = map.def||null; //default function or value
	if (map[osname]) {
		if (typeof map[osname] == 'function') { return map[osname](); }
		else { return map[osname]; }
	}
	else {
		if (typeof def == 'function') { return def(); }
		else { return def; }
	}
};


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var label1 = Titanium.UI.createLabel({
	color:'#000',
	text:'I am Window 1',
	font:{
		fontSize:40,
		fontFamily: os({
			iphone:'Spicy Rice',
			ipad: 'Spicy Rice',
			android:'SpicyRice-Regular'
		})
	},
	textAlign:'center',
	width:'auto'
});

win1.add(label1);

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{
		fontSize:40,
		fontFamily: os({
			iphone:'Burnstown Dam',
			ipad: 'Burnstown Dam',
			android:'burnstown_dam'
		})
	},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);



//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
