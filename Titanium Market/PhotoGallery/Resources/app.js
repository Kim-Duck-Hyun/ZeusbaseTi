// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Thumb on fly',
    backgroundColor:'#fff',
    url: 'galleria_square.js'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Thumb on fly',
    window:win1
});


//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Thumb ready',
    backgroundColor:'#fff',
    url: 'gallery_square.thumb.ready.js'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Thumb ready',
    window:win2
});




//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
