/*
 * Single Window Application Template:
 * A basic starting point for your application.  Mostly a blank canvas.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

/* Example Code 1

(function(){

	var icons = require('/ui/icons');

	var win   = Ti.UI.createWindow({backgroundColor:'#fff'});

	win.add(
		Ti.UI.createButton( {
			title: icons.envelope + ' Contact',
			font: {fontFamily: 'AppIcons', fontSize:'14pt' },
			color: 'black',
			width: '50%',
			center: {x:'50%', y:'50%'}
		})

	);
	win.open();

})();
*/



/* Example Code 2 
*/
(function(){

	var icons = require('/ui/icons');

	var win   = Ti.UI.createWindow({backgroundColor:'#fff'});

	win.add(
		Ti.UI.createLabel( {
			text: icons.rss,
			font: {fontFamily: 'AppIcons', fontSize:'72pt' },
			color: '#eee',
			center: {x:'50%', y:'50%'}
		})

	);
	win.open();

})();



/**
Window = require('/ui/ApplicationWindow');

new Window().open();
*/