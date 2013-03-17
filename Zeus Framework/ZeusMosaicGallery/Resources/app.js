/*
 * SingularTouch "Mosaic Demo" Application v1.0.2
 * 
 * http://singulartouch.com
 * support@singulartouch.com
 * 
 * Copyright 2011 - All rights reserved
 * 
 * 
 * DON'T FORGET TO CONTACT WITH US IF YOU NEED HELP WITH YOUR DEVELOPMENT!! 
 * AND, IN ORDER TO ENHANCE OUR COMPONENTS & APPLICATIONS, PLEASE: COMMENT, RATE AND FOLLOW US.
 * 
 * ;-)
 * 
 */

Ti.UI.setBackgroundColor('#000');

var tabGroup = Titanium.UI.createTabGroup();

var winDemoMosaic = Titanium.UI.createWindow({  
    url: 'SingularTouch/demo/MosaicDemo.js'		// Read this file to learn how to use Mosaic Component!! ;-)
});

var tabDemoMosaic = Titanium.UI.createTab({
    icon:'SingularTouch/demo/images/mosaic_icon.png',
    title:'Mosaic Demo',
    window:winDemoMosaic
});

tabGroup.addTab(tabDemoMosaic);

tabGroup.open({
	transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
});