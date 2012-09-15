var win = Ti.UI.currentWindow;

win.title = "Buttons";



var button1 = Ti.UI.createButton({
	left:12, top:36, width:145, height:47,
	title:'Blue Button',
	backgroundImage:'../../images/ipad-button-blue.png',
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	color:'white', shadowColor:'black', shadowOffset:{x:0, y:1},
	font:{fontWeight:'bold', fontSize:18}	
});
win.add(button1);

var button2 = Ti.UI.createButton({
	left:167, top:36, width:145, height:47,
	title:'Blue Button',
	backgroundImage:'../../images/ipad-button-blue-pressed.png',
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	color:'white', shadowColor:'black', shadowOffset:{x:0, y:1},
	font:{fontWeight:'bold', fontSize:18}
});
win.add(button2);

var button3 = Ti.UI.createButton({
	left:12, top:91, width:145, height:47,
	title:'Green Button',
	backgroundImage:'../../images/ipad-button-green.png',
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	color:'white', shadowColor:'black', shadowOffset:{x:0, y:1},
	font:{fontWeight:'bold', fontSize:18}
});
win.add(button3);

var button4 = Ti.UI.createButton({
	left:164, top:91, width:145, height:47,
	title:'Green Button',
	backgroundImage:'../../images/ipad-button-green-pressed.png',
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	color:'white', shadowColor:'black', shadowOffset:{x:0, y:1},
	font:{fontWeight:'bold', fontSize:18}
});
win.add(button4);

var button5 = Ti.UI.createButton({
	left:12, top:146, width:145, height:47,
	title:'Red Button',
	backgroundImage:'../../images/ipad-button-red.png',
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	color:'white', shadowColor:'black', shadowOffset:{x:0, y:1},
	font:{fontWeight:'bold', fontSize:18}
});
win.add(button5);

var button6 = Ti.UI.createButton({
	left:165, top:146, width:145, height:47,
	title:'Red Button',
	backgroundImage:'../../images/ipad-button-red-pressed.png',
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	color:'white', shadowColor:'black', shadowOffset:{x:0, y:1},
	font:{fontWeight:'bold', fontSize:18}
});
win.add(button6);

var button7 = Ti.UI.createButton({
	left:12, top:201, width:145, height:47,
	title:'Gray Button',
	backgroundImage:'../../images/ipad-button-grey.png',
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	color:'gray', shadowColor:'white', shadowOffset:{x:0, y:1},
	font:{fontWeight:'bold', fontSize:18}
});
win.add(button7);

var button8 = Ti.UI.createButton({
	left:165, top:201, width:145, height:47,
	title:'Gray Button',
	backgroundImage:'../../images/ipad-button-grey-pressed.png',
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	color:'gray', shadowColor:'white', shadowOffset:{x:0, y:1},
	font:{fontWeight:'bold', fontSize:18}
});
win.add(button8);




