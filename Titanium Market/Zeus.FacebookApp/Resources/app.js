Titanium.UI.setBackgroundColor('#000');

// create tab group
var facebook = {};	//`facebook` is the namespace of this app

//Include all the files for the namespace in the root app context
Ti.include(
	'ui.js',
	'dashView.js',
	'status.js',
	'friends.js',
	'profile.js',
	'album.js',
	'photos.js',
	'viewImage.js',
	'inbox.js',
	'thread.js',
	'newsFeed.js'
);

//where user Photo will remain saved
facebook.userPhoto;

//App ID of the application
facebook.appId = "134793934930";

//permissions required to use all the features of this application
facebook.permissions = ['publish_stream', 'read_insights','friends_status','read_stream','friends_birthday','friends_location','user_location','user_birthday','user_photos','friends_photos','read_mailbox','user_about_me' ,'friends_about_me'];

//Custom UI constructors to build the app's UI
var tabGroup = facebook.ui.createTabGroup();

tabGroup.open();// Open the tabgroup