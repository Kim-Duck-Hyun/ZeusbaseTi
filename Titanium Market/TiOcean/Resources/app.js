Titanium.UI.setBackgroundColor('#000');
Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;

var advappearancetoolkit = require('com.emityme.advappearance');
advappearancetoolkit.setAppearanceBarButtonItemBkgImage('images/ipad-menubar-button.png');
advappearancetoolkit.setAppearanceBackItemBkgImage('images/ipad-back.png');
advappearancetoolkit.setAppearanceNavTitleTextColor({color:'white', shadow:'black'});


if(Ti.Platform.osname == "ipad") {
	var winMaster = Ti.UI.createWindow({
		url:'views/ipad/ipad_master.js',
		title:"Master"
	});
	advappearancetoolkit.setWindowBkgImage(winMaster, 'images/ipad-BG.png');
	
	
	var navMaster = Ti.UI.iPhone.createNavigationGroup({
	   window: winMaster
	});
	advappearancetoolkit.setNavBkgImage(navMaster, 'images/ipad-menubar-left.png');
	
	var winDetail = Ti.UI.createWindow({
		url:'views/ipad/ipad_detail.js'
	});
	advappearancetoolkit.setWindowBkgImage(winDetail, 'images/ipad-BG.png');
	
	var navDetail = Ti.UI.iPhone.createNavigationGroup({
	   window: winDetail
	});
	advappearancetoolkit.setNavBkgImage(navDetail, 'images/ipad-menubar-right.png');	
	
	var splitwin = Ti.UI.iPad.createSplitWindow({
	    masterView: navMaster,
	    detailView: navDetail
	});
	
	splitwin.addEventListener('visible',function(e){
	    if (e.view == 'detail'){
	        e.button.title = "Master";
	        winDetail.leftNavButton = e.button;
	    } else if (e.view == 'master'){
	        winDetail.leftNavButton = null;
	    }
	});
	winDetail.mainWin = splitwin;
	
	splitwin.open();
} else {
	advappearancetoolkit.setAppearanceNavBkgImage('images/menubar.png');
	var tabGroup = Titanium.UI.createTabGroup();
	advappearancetoolkit.setAppearanceTabbarBkgImage('images/tabbar.png');
	advappearancetoolkit.setAppearanceTabSelIndicatorImage('images/tabbar-active.png');
	advappearancetoolkit.setAppearanceTabSelImageTintColor('white');
	
	var win1 = Titanium.UI.createWindow({  
	    url:'views/iphone/iphone_elem.js'
	});
	advappearancetoolkit.setWindowBkgImage(win1, 'images/ipad-BG.png');
	
	var tab1 = Titanium.UI.createTab({  
	    icon:'images/tab-icon1.png',
	    title:'Elements',
	    window:win1
	});
	tabGroup.addTab(tab1);  

	var win2 = Titanium.UI.createWindow({  
	    url:'views/iphone/iphone_buttons.js'
	});
	advappearancetoolkit.setWindowBkgImage(win2, 'images/ipad-BG.png');
		
	var tab2 = Titanium.UI.createTab({  
	    icon:'images/tab-icon2.png',
	    title:'Buttons',
	    window:win2
	});
	tabGroup.addTab(tab2);  
	
	
	var win3 = Titanium.UI.createWindow({  
	    url:'views/iphone/iphone_list.js'
	});
	advappearancetoolkit.setWindowBkgImage(win3, 'images/ipad-BG.png');
	
	var tab3 = Titanium.UI.createTab({  
	    icon:'images/tab-icon3.png',
	    title:'List',
	    window:win3
	});
	tabGroup.addTab(tab3); 
	
	var win4 = Titanium.UI.createWindow({  
		title:'Other'
	});
	advappearancetoolkit.setWindowBkgImage(win4, 'images/ipad-BG.png');
	
	var tab4 = Titanium.UI.createTab({  
	    icon:'images/tab-icon4.png',
	    title:'Other',
	    window:win4
	});
	tabGroup.addTab(tab4); 
	
	tabGroup.open();	
}


