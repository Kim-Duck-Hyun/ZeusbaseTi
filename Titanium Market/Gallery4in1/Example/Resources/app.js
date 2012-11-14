
//################# MODULES ##################
var VARS =require('common/globals'); //Here we store all global variables / settings
var Gallery=require('lib/galleryModule'); //Here are the functions to create the gallery


//
// Create the window, For the activity
//
var win1 = Titanium.UI.createWindow({  
    title:'Gallery',
    backgroundColor:'#2e2e2e',
    barColor:'#3e3e3c',
    tabBarHidden:true,
});
//Create the tab
var tab1 = Titanium.UI.createTab({  
    title:'Gallery',
    window:win1
});

/**
 * The gallery window
 * First create this window, you will pass it to each gallery to display the gallery inside this window
 */
var galleryWindow = Ti.UI.createWindow({
		backgroundColor : '#2e2e2e',
		tabBarHidden : true,
		navBarHidden : false,
		barColor : '#3e3e3c',
		orientationModes : [Titanium.UI.PORTRAIT]
})

//################### FUNCTIONS #############################
//  -------- EXAMPLES HOW TO USE THE GALERIES --------------
	
//Function to create NextGen Gallery
createNextGen=function()
{
	
	Gallery.createGalleryList({
		win:galleryWindow,
		title:"NextGen Gallery",
		id:1,
		url:VARS._NextGen_Address,
		type:VARS._NEXT_GEN,
		openType:1,
		tab:tab1});
	tab1.open(galleryWindow);
}

//Function to create Facebook Gallery
createFB=function()
{

		Gallery.createGalleryList({
			win:galleryWindow,
			title:"Facebook Gallery",
			page:VARS._FBPageID,
			type:VARS._FB_GALLERY,
			openType:1,
			tab:tab1
		});
	tab1.open(galleryWindow);
}

//Function to create Facebook Gallery
createPicasa=function()
{
	
		Gallery.createGalleryList({
			win:galleryWindow,
			title:"Picasa Gallery",
			userID:VARS._PicasaUserId,
			type:VARS._PICASA,
			openType:1,
			tab:tab1
		});
	tab1.open(galleryWindow);
}

//Function to create Flickr Gallery
createFlickr=function()
{

		Gallery.createGalleryList({
			win:galleryWindow,
			title:"Flickr Gallery",
			type:VARS._FLICKR,
			openType:1,
			tab:tab1,
			appKEY:VARS._FlickrAppKEY,
			userID:VARS._FlickrUserID,
		});
	tab1.open(galleryWindow);
}

// create tab group
var tabGroup = Titanium.UI.createTabGroup();



//Create the table rows
var rowHeight="91dp";
var isPad="";
if(VARS._platform==VARS._iPad)
{
	rowHeight=182;
	isPad="pad";
}
var nextGenRow=Ti.UI.createTableViewRow({
	backgroundImage:"images/nextgen"+isPad+".jpg",
	width:"100%",
	height:rowHeight,
	fun:createNextGen
})
var fbRow=Ti.UI.createTableViewRow({
	backgroundImage:"images/fb"+isPad+".jpg",
	width:"100%",
	height:rowHeight,
	fun:createFB
})
var flickrRow=Ti.UI.createTableViewRow({
	backgroundImage:"images/flickr"+isPad+".jpg",
	width:"100%",
	height:rowHeight,
	fun:createFlickr
})
var piRow=Ti.UI.createTableViewRow({
	backgroundImage:"images/pi"+isPad+".jpg",
	width:"100%",
	height:rowHeight,
	fun:createPicasa
})
var rows=[nextGenRow,fbRow,flickrRow,piRow];

//Create table view
var theTable=Ti.UI.createTableView({
	top:10,
	data:rows,
	backgroundColor:'#2e2e2e',
	separatorColor:'#2e2e2e',
})
win1.add(theTable)





//Add event listner on the table
theTable.addEventListener('click',function(e)
{
	//Execute the function attached to this row
	e.source.fun();
})

//
//  add tabs
//
tabGroup.addTab(tab1);   


// open tab group
tabGroup.open();


//############### SHARE SETTINGS #####################
Ti.Facebook.appid = "134793934930"; //Change this with your own Facebook app id
Ti.Facebook.permissions = ['publish_stream', 'read_stream'];
Ti.Facebook.forceDialogAuth = true;
