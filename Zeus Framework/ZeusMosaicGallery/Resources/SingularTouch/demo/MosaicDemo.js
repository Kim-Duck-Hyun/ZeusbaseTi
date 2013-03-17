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

// Namespaces
var SingularTouch = {
	UI: {},
	Utils: {}
};

// Utils
Ti.include("../utils/DownloadMedia.js");

// UI Components
Ti.include("../ui/MosaicBasicItem.js");		// Read this file and learn how to create your own basic Mosaic items
Ti.include("../ui/MosaicFlipItem.js");		// Read this file and learn how to create your own advanced Mosaic items
Ti.include("../ui/Mosaic.js");

var win = Ti.UI.currentWindow;
//win.orientationModes = [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT];

win.title = "Mosaic Demo 1.0.2";
win.barColor = '#333';
win.backgroundImage = 'images/texture.png';
win.translucent = false;

//SingularTouch.Utils.clearMediaCache(true);	// Delete all cached files (empty SingularTouch.Utils.mediaCachePath directory)
//SingularTouch.Utils.clearMediaCache(false);	// Delete only expired cached files (see SingularTouch.Utils.mediaCacheTime, 7 days by default) 

// The array of items (views) you want insert in Mosaic 
var myItems = [];

/******************************************************************************
 * BASIC EXAMPLE: CONTENT OF THE MOSAIC FROM LOCAL PATH WITH RANDOM IMAGES
 *
 * Comment next lines in order to run "Advanced Example 1" or "Advanced Example 2" (remote loading)
 */
for (var i = 0; i < 20; i++)
{
	// You can add custom 'data' object to your item view
	var data = {
		id: Math.round(Math.random() * 100),
		//image: 'images/photos/' + (i + 1) + '.jpg',								// Loading local images
		image: 'http://singulartouch.com/testing/images/' + (i + 1) + '.jpg',		// Downloading and caching remote files
		title: 'Sample Photo ' + (i + 1),
		subtitle: 'saturday, 09 of july of 2011',
		description: 'This is an example of description that you could write for your item.'
	};

	// Create advanced flip item from a factory constructor
	myItems[i] = SingularTouch.UI.createMosaicFlipItem({
		borderRadius: 5,
		data: data
	});
	
	// Create basic shadow item from a factory constructor
	// myItems[i] = SingularTouch.UI.createMosaicBasicItem(data);
}


/******************************************************************************
 * ADVANCED EXAMPLE 1: LOADING THEN CONTENT OF THE MOSAIC FROM REMOTE SERVER (JSON FORMAT)
 */
var mosaic_json_server = Ti.Network.createHTTPClient({
	timeout: 20000,
	onload: function ()
	{	
		var items = JSON.parse(this.responseText);
		
		if (!items || !items.length)
		{
			alert("Error: empty JSON response!!");
			return false;
		}
				
		myItems = [];
		
		for (var i = 0, len = items.length; i < len; i++)
		{
			// Create advanced flip item from a factory constructor
			myItems[i] = SingularTouch.UI.createMosaicFlipItem({
				borderRadius: 5,
				data: items[i]
			});
		}
		
		myMosaic.updateItems(myItems);
		
		myMosaic.headerVisible(true);
		myMosaic.footerVisible(true);
	},
	
	onerror: function ()
	{
		// You could remove here the old items of Mosaic 
		// myMosaic.updateItems(null);
		
		myMosaic.headerVisible(false);
		myMosaic.footerVisible(false);
		alert("JSON server connection error!!");
	}
});

/******************************************************************************
 * ADVANCED EXAMPLE 2: LOADING THEN CONTENT OF THE MOSAIC FROM REMOTE SERVER (XML FORMAT)
 */
var mosaic_xml_server = Ti.Network.createHTTPClient({
	timeout: 20000,
	onload: function ()
	{	
		var doc = this.responseXML.documentElement;
		var items = doc.getElementsByTagName("item");
		
		if (!items || !items.length)
		{
			alert("Error: empty XML response!!");
			return false;
		}
		
		myItems = [];
		
		for (var i = 0, len = items.length; i < len; i++)
		{
			var item = items.item(i);
			
			var item_data = {
				id: item.getElementsByTagName("id").item(0).text,
				image: item.getElementsByTagName("image").item(0).text,
				title: item.getElementsByTagName("title").item(0).text,
				subtitle: item.getElementsByTagName("subtitle").item(0).text,
				description: item.getElementsByTagName("description").item(0).text
			};
			
			// Create advanced flip item from a factory constructor
			myItems[i] = SingularTouch.UI.createMosaicFlipItem({
				borderRadius: 5,
				data: item_data
			});
		}
		
		myMosaic.updateItems(myItems);
		
		myMosaic.headerVisible(true);
		myMosaic.footerVisible(true);
	},
	
	onerror: function ()
	{
		// You could remove here the old items of Mosaic 
		// myMosaic.updateItems(null);
		
		myMosaic.headerVisible(false);
		myMosaic.footerVisible(false);
		alert("XML server connection error!!");
	}
});



/******************************************************************************
 * NAVIGATION BAR OPTIONS
 */
var bbHeaderFooter = Titanium.UI.createButtonBar({
	labels:['Header', 'Footer', 'Fading'],
	backgroundColor:'#555',
	width: 270,
	style:Titanium.UI.iPhone.SystemButtonStyle.BAR
});

bbHeaderFooter.addEventListener('click', function(ev)
{
	// Toogle Header
	if (ev.index == 0)
	{
		myMosaic.headerVisible(!myMosaic.headerVisible());
		myMosaic.scrollTo(0, 0);
	}
	// Toogle Footer
	else if (ev.index == 1)
	{
		myMosaic.footerVisible(!myMosaic.footerVisible());
	}
	// Fade Item
	else if (ev.index == 2)
	{
		var index = Math.round(Math.random() * myMosaic.totalItems());
		
		// Second parameter is the duration of the fading effect (opacity from 1.0 to 0.0)
		myMosaic.fadeOut(index, 300); 
	}
});

var bbAddRemove = Titanium.UI.createButtonBar({
	labels:['Add', 'Remove'],
	backgroundColor:'#555',
	width: 180,
	style:Titanium.UI.iPhone.SystemButtonStyle.BAR
});

bbAddRemove.addEventListener('click', function(ev)
{
	// Add item
	if (ev.index == 0)
	{
		var tmpId = Math.round(Math.random() * 30);
		
		var data = {
			id: tmpId,
			title: 'New basic item ' + tmpId	
		};
	
		// Create basic item from a factory constructor
		var item = SingularTouch.UI.createMosaicBasicItem(data);
		
		// Add item sorted (if false, would be added at the end of the mosaic)
		myMosaic.addItem(item, true);
	}
	// Remove item
	else if (ev.index == 1)
	{
		// Remove item at index 0 with 1000 msec animation duration
		myMosaic.removeItem(0, 1000);
	}
});

/******************************************************************************
 * HEADER VIEW OF THE MOSAIC
 */
var headerView = Ti.UI.createView({
	top:10,
	width:'auto',
	height:'auto',
	layout:'horizontal'
});

if (Ti.Platform.osname != 'android')
{
	var tbSortBy = Titanium.UI.createTabbedBar({
		labels:['By Id', 'By Title'],
		backgroundColor:'#555',
		style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
		width:200,
		height:'auto',
		index:0,
		left:0
	});
	
	tbSortBy.addEventListener('click', function(ev)
	{
		if (ev.index == 0)
		{
			myMosaic.orderBy('id', myMosaic.orderDir());
		}
		else if (ev.index == 1)
		{
			myMosaic.orderBy('title', myMosaic.orderDir());
		}
	});
	
	var tbSortDir = Titanium.UI.createTabbedBar({
		labels:['Ascending', 'Descending'],
		backgroundColor:'#555',
		style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
		width:200,
		height:'auto',
		index:0,
		left:20
	});
	
	tbSortDir.addEventListener('click', function(ev)
	{
		var field = myMosaic.orderField();
		
		if (field == '')
		{
			field = 'id';
		}
		
		if (ev.index == 0)
		{
			myMosaic.orderBy(field, 'asc');
		}
		else if (ev.index == 1)
		{
			myMosaic.orderBy(field, 'desc');
		}
	});

	var tbConfig = Titanium.UI.createTabbedBar({
		labels:['Example 1', 'Example 2'],
		backgroundColor:'#555',
		style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
		width:200,
		height:'auto',
		left:20
	});
	
	tbConfig.addEventListener('click', function(ev)
	{
		if (ev.index == 0)
		{
			myMosaic.animationDuration(400);
			myMosaic.itemHeight(120);
			myMosaic.verticalMargin(30);
			myMosaic.horizontalMargin(30);
			myMosaic.landscapeColumns(3);
			myMosaic.portraitColumns(2);
		}
		else
		{
			myMosaic.animationDuration(1000);
			myMosaic.itemHeight(120);
			myMosaic.verticalMargin(5);
			myMosaic.horizontalMargin(5);
			myMosaic.landscapeColumns(5);
			myMosaic.portraitColumns(4);
		}
		
		myMosaic.refresh();
	});
}

if (Ti.Platform.osname != 'android')
{
	win.leftNavButton = bbAddRemove;
	win.rightNavButton = bbHeaderFooter;
	
	headerView.add(tbSortBy);
	headerView.add(tbSortDir);
	headerView.add(tbConfig);
}



/******************************************************************************
 * FOOTER VIEW OF THE MOSAIC
 */
var footerView = Ti.UI.createView({
	bottom:10,
	width:'auto',
	height:50,
	layout:'horizontal'
});

var lblTotalItems = Titanium.UI.createLabel({
	color:'#FFF',
	text: '0 items',
	font:{fontSize:15,fontFamily:'Helvetica Neue',fontWeight:'bold'},
	textAlign:'center',
	height:'auto',
	width:'auto',
	shadowColor:"#000",
	shadowOffset:{x:0, y:1}
});
footerView.add(lblTotalItems);


/******************************************************************************
 ******************************************************************************
 * 
 * MOSAIC COMPONENT (inherit from ScrollView)
 * 
 ******************************************************************************
 *****************************************************************************/

/*
 * CONSTRUCTOR WITH ALL POSSIBLE PARAMETERS
 */
myMosaic = SingularTouch.UI.createMosaic({
	// ScrollView properties
	top: 0,
	bottom: 0,
	minZoomScale: 1.0,
	maxZoomScale: 2.0,
	disableBounce: false,
	showVerticalScrollIndicator: true,
	showHorizontalScrollIndicator: true,
	// Mosaic specific properties
	landscapeColumns: 4,					// Number of columns in landscape mode (horizontal). Default: 4
	portraitColumns: 3,						// Number of columns in portrait mode (vertical). Default: 3
	horizontalMargin: 20,					// Horizontal margin between items and borders of the Window. Default: 20
	verticalMargin: 20,						// Vertical margin between items and borders of the Window. Default: 20
	itemHeight: 192,						// Item height (equal for all items). Item width auto-calculated from Window width
	animationDuration: 250,					// Animations duration (in milliseconds). 
	header: headerView,						// Header view (optional, you can after add or remove it with 'addHeader' and 'removeHeader' method)
	footer: footerView,						// Footer view (optional, you can after add or remove it with 'addFooter' and 'removeFooter' methods)
	items: myItems							// Array of items (optional, you can after add or remove it with 'addItem', 'removeItem' and 'updateItems' methods)
});

win.add(myMosaic);


/*
 * ADVANCED EXAMPLE 1: LOADING ITEMS FROM REMOTE JSON FILE
 */
//mosaic_json_server.open('GET', 'http://localhost/mosaic_content.json', true);						// If you want do testing from your local machine
//mosaic_json_server.open('GET', 'http://singulartouch.com/testing/mosaic_content.json', true);		// If you want do testing with our files ;-)
//mosaic_json_server.send();


/*
 * ADVANCED EXAMPLE 2: LOADING ITEMS FROM REMOTE XML FILE
 */
//mosaic_xml_server.open('GET', 'http://localhost/mosaic_content.xml', true);						// If you want do testing from your local machine
//mosaic_xml_server.open('GET', 'http://singulartouch.com/testing/mosaic_content.xml', true);		// If you want do testing with our files ;-)
//mosaic_xml_server.send();


/*
 * PUBLIC SETTERS & GETTERS OF THE MOSAIC
 */
Ti.API.info("isUpdating: " + myMosaic.isUpdating());				// only getter (true if Mosaic is in internal operation like sorting or refresh)
Ti.API.info("totalItems: " + myMosaic.totalItems());				// only getter
Ti.API.info("itemWidth: " + myMosaic.itemWidth());					// only getter (auto-calculated by Mosaic)
Ti.API.info("itemHeight: " + myMosaic.itemHeight());				// setter & getter (in pixels)
Ti.API.info("orderField: " + myMosaic.orderField());				// only getter (empty if not ordered)
Ti.API.info("orderDir: " + myMosaic.orderDir());					// only getter ('asc' | 'desc')

Ti.API.info("animationDuration: " + myMosaic.animationDuration());	// setter & getter (in milliseconds)
Ti.API.info("verticalMargin: " + myMosaic.verticalMargin());		// setter & getter (in pixels)
Ti.API.info("horizontalMargin: " + myMosaic.horizontalMargin());	// setter & getter (in pixels)
Ti.API.info("landscapeColumns: " + myMosaic.landscapeColumns());	// setter & getter (number of columns you want in landscape)
Ti.API.info("portraitColumns: " + myMosaic.portraitColumns());		// setter & getter (number of columns you want in portrait)


/*
 * EVENTS OF THE MOSAIC
 */

// This event is dispatched by Mosaic is this cases:
//	1. You call "refresh()" method
//	2. You add or remove an item
//	3. You call the "orderBy(...)" method
//	4. You change the orientation of the device
myMosaic.addEventListener('refresh', function (ev)
{	
	// ev.totalItems				Total items in mosaic
	// ev.orderBy					Current order field
	// ev.orderDir					Current order direction (asc | desc)
	// ev.itemAdded					Index of the last item added before in this refresh (-1 if none)
	// ev.itemRemoved 				Index of the last item removed before in this refresh (to validate deletions, -1 if none)
	Ti.API.info("Refresh with: " + ev.totalItems + " total items, sorted by: '" + ev.orderBy + "' (" + ev.orderDir + "), last item added: " + ev.itemAdded + ", last item removed: " + ev.itemRemoved);
	
	lblTotalItems.text = myMosaic.totalItems() + ' items';
});

// This event is dispatched when user click/touch an item
myMosaic.addEventListener('selected', function (ev)
{
	// ev.index						Index of the item (start at 0)
	// ev.row						Row of the item
	// ev.col						Col of the item
	// ev.view						The view associated to the item (with the data associated)
	Ti.API.info("Item selected at index: " + ev.index + ", row-col: " + ev.row + "-" + ev.col + ", id: " + ev.view.data.id);
});

// This event is dispatched when a fadding in effect (opacity from 0.0 to 1.0) is completed for one or all items
myMosaic.addEventListener("fadeIn", function (ev)
{
	// ev.index						Index of the item faded, or -1 if was a fading of all items
	// ev.duration					Milliseconds of effect duration
	Ti.API.info("Fade In of item index " + ev.index + " completed!!");
});

// This event is dispatched when a fadding out effect (opacity from 1.0 to 0.0) is completed for one or all items
myMosaic.addEventListener("fadeOut", function (ev)
{
	// ev.index						Index of the item faded, or -1 if was a fading of all items
	// ev.duration					Milliseconds of effect duration
	Ti.API.info("Fade Out of item index " + ev.index + " completed!!");
	
	myMosaic.fadeIn(ev.index, ev.duration); // Reverse the effect with the same velocity
});